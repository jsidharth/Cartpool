package com.cmpe275.cartpool.controller;

import com.cmpe275.cartpool.DataObjects.OrderRequest;
import com.cmpe275.cartpool.DataObjects.ProductStoreQuantity;
import com.cmpe275.cartpool.entities.OrderProductStore;
import com.cmpe275.cartpool.entities.Orders;
import com.cmpe275.cartpool.entities.User;
import com.cmpe275.cartpool.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
        Orders savedOrder = orderService.addOrder(orders);

        List<ProductStoreQuantity> productStoreQuantities = orderRequest.getProductStoreList();

        for(ProductStoreQuantity productStoreQuantity:productStoreQuantities){
            OrderProductStore productStore = new OrderProductStore();
            productStore.setOrder(savedOrder);
            productStore.setProductStore(productStoreService.findById(productStoreQuantity.getProductStoreId()));
            productStore.setQuantity(productStoreQuantity.getQuantity());
            orderProductStoreService.addOrderProductStore(productStore);
        }
        return new ResponseEntity(savedOrder.getId(), HttpStatus.OK);
    }

    @GetMapping("/getPoolAndStore/{pool_id}/{store_id}")
    public List<Orders> getOrdersByPoolAndUser(User user, @PathVariable String pool_id, @PathVariable int store_id){
        return orderService.getOrderByPoolAndStore(pool_id, store_id);
    }

    @GetMapping("/getAllOrdersAssignedTo")
    public List<Orders> getOrdersAssignedToUser(User user){
        return orderService.getAllOrdersAssignedToUser(user.getId());
    }

    @PutMapping("/orders/assignToUser/{order_id}/{user_id}")
    public void editAssignedToUser(User user, @PathVariable int order_id, @PathVariable int user_id){
        orderService.changeAssignedToUser(order_id,user_id);
    }
}
