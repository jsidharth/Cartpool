package com.cmpe275.cartpool.controller;

import com.cmpe275.cartpool.DataObjects.OrderRequest;
import com.cmpe275.cartpool.DataObjects.ProductStoreQuantity;
import com.cmpe275.cartpool.DataObjects.UserMultipleOrders;
import com.cmpe275.cartpool.entities.*;
import com.cmpe275.cartpool.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
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


    @GetMapping("/order/{orderId}")
    public Orders getOrderbyId(@PathVariable int orderId){
        return orderService.getOrderById(orderId);
    }

    /**
     * Modify an existing order
     * @param orders
     * @return
     */
    @PutMapping("/orders")
    public Orders updateOrders(User user, @RequestBody Orders orders){
        return orderService.updateOrder(orders);
    }

    /**
     * Return all the orders
     * @return orderList
     */
    @GetMapping("/orders")
    public List<Orders> getAllOrders(User user){
        return orderService.getOrders();
    }

    /**
     * Delete an order
     * @param id
     * @return status
     */
    @DeleteMapping("/orders/{id}")
    public int deleteOrder(User user, @PathVariable int id){
        if(orderService.deleteById(id) == 0) {
            return 0;
        }else{
            return -1;
        }
    }

    /**
     * Get an order for a user by their id
     * @param id
     * @return Order
     */
    @GetMapping("/orders/{id}")
    public List<Orders> getOrderByUserId(User user, @PathVariable int id){
        return orderService.getOrdersByUserId(id);
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
        //TODO calculate total
        Orders savedOrder = orderService.addOrder(orders);

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
        savedOrder.setTotal(total);
        orderService.updateOrder(savedOrder);
        return new ResponseEntity(savedOrder.getId(), HttpStatus.OK);
    }

    @GetMapping("/getPoolAndStore/{pool_id}/{store_id}")
    public List<Orders> getOrdersByPoolAndUser(User user, @PathVariable String pool_id, @PathVariable int store_id){
        return orderService.getOrderByPoolAndStore(pool_id, store_id);
    }

    @GetMapping("/getUnassignedOrdersOfStoreInPool/{order_id}")
    public List<Orders> getUnassignedOrdersOfStoreInPool(User user, @PathVariable int order_id){
        return orderService.getUnassignedOrdersForStoreInPool(order_id);
    }

    @GetMapping("/getUnassignedOrdersInPool/{pool_id}")
    public List<Orders> getUnassignedOrdersInPool(User user, @PathVariable String pool_id){
        return orderService.getUnassignedOrdersInPool(pool_id);
    }

    @GetMapping("/getAllOrdersAssignedTo")
    public List<Orders> getOrdersAssignedToUser(User user){
        return orderService.getAllOrdersAssignedToUser(user.getId());
    }

    @PutMapping("/orders/assignToUser/")
    public void editAssignedToUser(User user, @RequestBody UserMultipleOrders userMultipleOrders){
        List<Integer> order_ids = userMultipleOrders.getOrder_ids();
        for(int order_id:order_ids) {
            orderService.changeAssignedToUser(order_id, user.getId());
        }
    }
}
