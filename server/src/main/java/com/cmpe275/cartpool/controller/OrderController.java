package com.cmpe275.cartpool.controller;

import com.cmpe275.cartpool.entities.Orders;
import com.cmpe275.cartpool.entities.User;
import com.cmpe275.cartpool.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class OrderController {
    @Autowired
    OrderService orderService;

    /**
     * Add an order to the database
     * @param orders
     * @return entered order
     */
    @PostMapping("/orders")
    public Orders addOrder(@RequestBody Orders orders){
        return orderService.addOrder(orders);
    }

    /**
     * Modify an existing order
     * @param orders
     * @return
     */
    @PutMapping("/orders")
    public Orders updateOrders(@RequestBody Orders orders){
        return orderService.updateOrder(orders);
    }

    /**
     * Return all the orders
     * @return orderList
     */
    @GetMapping("/orders")
    public List<Orders> getAllOrders(){
        return orderService.getOrders();
    }

    /**
     * Delete an order
     * @param id
     * @return status
     */
    @DeleteMapping("/orders/{id}")
    public int deleteOrder(@PathVariable int id){
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
    public List<Orders> getOrderByUserId(@PathVariable int id){
        return orderService.getOrdersByUserId(id);
    }
}
