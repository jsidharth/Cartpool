package com.cmpe275.cartpool.controller;

import com.cmpe275.cartpool.DataObjects.OrderRequest;
import com.cmpe275.cartpool.DataObjects.ProductStoreQuantity;
import com.cmpe275.cartpool.DataObjects.UserMultipleOrders;
import com.cmpe275.cartpool.entities.*;
import com.cmpe275.cartpool.services.*;
import org.apache.http.protocol.HTTP;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000", "http://10.0.0.155:3000"})
@RestController
public class OrderController {
    @Autowired
    OrderService orderService;

    @Autowired
    StoreService storeService;

    @Autowired
    PoolService poolService;

    @Autowired
    ProductStoreService productStoreService;

    @Autowired
    OrderProductStoreService orderProductStoreService;

    @Autowired
    ProductService productService;

    @Autowired
    EmailService emailService;
  
    @Autowired
    UserService userService;

    @GetMapping("/order/{orderId}")
    public ResponseEntity getOrderbyId(@PathVariable int orderId){
        Orders order = orderService.getOrderById(orderId);
        User user_ = order.getOrderedByUser();
        order.setScreenName(user_.getScreenName());
        order.setStreet(user_.getStreet());
        order.setState(user_.getState());
        order.setZip(user_.getZip());
        order.setCity(user_.getCity());
        return ResponseEntity.ok(order);
    }

    /**
     * Modify an existing order
     * @param orders
     * @return
     */
    @PutMapping("/orders")
    public ResponseEntity updateOrders(User user, @RequestBody Orders orders){
        return ResponseEntity.ok(orderService.updateOrder(orders));
    }

    /**
     * Return all the orders
     * @return orderList
     */
    @GetMapping("/orders")
    public ResponseEntity getAllOrders(User user){
        return ResponseEntity.ok(orderService.getOrders());
    }

    /**
     * Delete an order
     * @param id
     * @return status
     */
    @DeleteMapping("/orders/{id}")
    public ResponseEntity deleteOrder(User user, @PathVariable int id){
        if(orderService.deleteById(id) == 0) {
            return new ResponseEntity(HttpStatus.OK);
        }else{
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Get an order for a user by their id
     * @param id
     * @return Order
     */
    @GetMapping("/orders/{id}")
    public ResponseEntity getOrderByUserId(User user, @PathVariable int id){
        return ResponseEntity.ok(orderService.getOrdersByUserId(id));
    }

    /*
    @GetMapping("/orders/pool/{id}")
    public List<Orders> getOrderByPoolId(@PathVariable int id){
        return orderService.getOrdersByPoolId(id);
    }*/

    /*
    //Get all orders that are unassigned
    @GetMapping("orders/unassigned/{pool_id}")
    public List<Orders> getUnassignedOrders(@PathVariable int pool_id){
        return orderService.getUnassignedOrders(pool_id);
    }
    */

    @PostMapping("/orders")
    public ResponseEntity addOrder(User user, @RequestBody OrderRequest orderRequest){
        Orders orders = new Orders();
        orders.setStoreId(storeService.getStoreById(orderRequest.getStoreId()));
        orders.setOrderedByUser(user);
        orders.setPool(poolService.getPoolById(orderRequest.getPoolId()));
        orders.setOrderStatus(Status.ORDER_PLACED);
        //Set the current orderedTime to now
        Date date = new Date(System.currentTimeMillis());
        orders.setPlacedTime(date);
        Orders savedOrder = orderService.addOrder(orders);
        DecimalFormat df = new DecimalFormat("0.00");
        savedOrder.setActive(true);

        List<ProductStoreQuantity> productStoreQuantities = orderRequest.getProductStoreList();

        float total = 0;
        for(ProductStoreQuantity productStoreQuantity:productStoreQuantities){
            OrderProductStore productStore = new OrderProductStore();
            ProductStore temp = productStoreService.findById(productStoreQuantity.getProductStoreId());
            Product product = productService.getProductById(temp.getProductId());
            total += product.getPrice() * productStoreQuantity.getQuantity();
            productStore.setOrder(savedOrder);
            productStore.setProductStore(temp);
            productStore.setQuantity(productStoreQuantity.getQuantity());
            orderProductStoreService.addOrderProductStore(productStore);
        }
        double temp = (total + total*0.005);
        total += total*0.0925;
        total += temp;
        String rounded = df.format(total);
        savedOrder.setTotal(Float.valueOf(rounded));
        savedOrder = orderService.updateOrder(savedOrder);
        //send email that its placed
        //update credit
        user.setCredit(user.getCredit()-1);
        userService.createUser(user);
        String html = emailService.orderHtml(Status.ORDER_PLACED, savedOrder.getId());
        emailService.sendMail("",user.getScreenName(),user.getEmail(),"CartPool: Order "+savedOrder.getId()+" placed",html);
        return new ResponseEntity(savedOrder.getId(), HttpStatus.OK);
    }

    @PutMapping("/orders/{order_id}/{statusString}")
    public ResponseEntity updateOrder(User user, @PathVariable int order_id, @PathVariable String statusString){
        Orders orders = orderService.getOrderById(order_id);
        Date date = new Date(System.currentTimeMillis());
        Status updatedStatus = Status.valueOf(statusString);
        if(updatedStatus == Status.ORDER_DELIVERED){
            orders.setOrderStatus(Status.ORDER_DELIVERED);
            orders.setDeliveredTime(date);
        }else if(updatedStatus == Status.ORDER_PICKED){
            orders.setPickedTime(date);
            orders.setOrderStatus(Status.ORDER_PICKED);
        }
        orderService.updateOrder(orders);
        //send email
        //send only if assigned and this user are not same
        String html;
        if(updatedStatus == Status.ORDER_NOT_DELIVERED) {
            html = emailService.orderHtml(Status.ORDER_NOT_DELIVERED, orders.getId());
            emailService.sendMail(user.getScreenName(),orders.getAssignedToUser().getScreenName(),orders.getAssignedToUser().getEmail(),"CartPool: Order "+orders.getId()+" not delivered",html);
        } else {
            //send these only if the user and assigned are different
            if (!user.getScreenName().equals(orders.getScreenName())){
                if (updatedStatus == Status.ORDER_PICKED) {
                    html = emailService.orderHtml(Status.ORDER_PICKED, orders.getId());
                    emailService.sendMail(user.getScreenName(),orders.getAssignedToUser().getScreenName(),orders.getAssignedToUser().getEmail(),"CartPool: Order "+orders.getId()+" picked",html);
                    String htmlDelivery = emailService.deliveryHtml(orders.getId());
                    emailService.sendMail("", user.getScreenName(), user.getEmail(), "CartPool: Order "+orders.getId()+" delivery instructions ",htmlDelivery);
                } else {
                    html = emailService.orderHtml(Status.ORDER_DELIVERED, orders.getId());
                    emailService.sendMail(user.getScreenName(),orders.getAssignedToUser().getScreenName(),orders.getAssignedToUser().getEmail(),"CartPool: Order "+orders.getId()+" delivered",html);
                }
            }
        }
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/getPoolAndStore/{pool_id}/{store_id}")
    public ResponseEntity getOrdersByPoolAndUser(User user, @PathVariable String pool_id, @PathVariable int store_id){
        return ResponseEntity.ok(orderService.getOrderByPoolAndStore(pool_id, store_id));
    }

    @GetMapping("/getUnassignedOrdersOfStoreInPool/{order_id}")
    public ResponseEntity getUnassignedOrdersOfStoreInPool(User user, @PathVariable int order_id){
        return ResponseEntity.ok(orderService.getUnassignedOrdersForStoreInPool(order_id));
    }

    @GetMapping("/getUnassignedOrdersInPool/{pool_id}")
    public ResponseEntity getUnassignedOrdersInPool(User user, @PathVariable String pool_id){
        return ResponseEntity.ok(orderService.getUnassignedOrdersInPool(pool_id));
    }

    @GetMapping("/getAllOrdersAssignedTo")
    public ResponseEntity getOrdersAssignedToUser(User user){
        return ResponseEntity.ok(orderService.getAllOrdersAssignedToUser(user.getId()));
    }

    @PutMapping("/orders/assignToUser/")
    public ResponseEntity editAssignedToUser(User user, @RequestBody UserMultipleOrders userMultipleOrders){
        List<Integer> order_ids = userMultipleOrders.getOrder_ids();
        List<Orders> orders = new ArrayList<>();
        List<User> customers = new ArrayList<>();
        for(int order_id:order_ids) {
            orderService.changeAssignedToUser(order_id, user.getId());
            orders.add(orderService.findOrderById(order_id));
        }
        int credit_upgrade = order_ids.size();
        user.setCredit(user.getCredit() + credit_upgrade);
        userService.createUser(user);
        //sendemail to 2 guys
        Boolean flag = false;
        for (Orders order: orders) {
            //email to this customer
            User customer = order.getOrderedByUser();
            if (user != customer){
                flag = true;
                String html = emailService.orderAssignedHtml(order.getId(), user.getScreenName());
                emailService.sendMail("",customer.getScreenName(),customer.getEmail(),"CartPool: Your order has been assigned", html);
            }
        }
        //send this guy the pickup instructions
        if (flag) {
            String html = emailService.orderAssigneeHtml(orders);
            emailService.sendMail("",user.getScreenName(),user.getEmail(),"CartPool: orders to pickup", html);
        }
        return ResponseEntity.ok("Order assigned");
    }

    @GetMapping("/update/order/{orderId}/{orderStatus}")
    public ResponseEntity putOrderPickup(User user, @PathVariable int orderId, @PathVariable String orderStatus ) {
        //TODO transient entity
        System.out.println("Here "+ orderId + Status.valueOf(orderStatus) + orderStatus);
        Orders order = orderService.getOrderById(orderId);
        order.setOrderStatus(Status.valueOf(orderStatus));
        order = orderService.updateOrder(order);
        return ResponseEntity.ok(order);
    }
}
