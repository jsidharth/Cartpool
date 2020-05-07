package com.cmpe275.cartpool.services;

import com.cmpe275.cartpool.entities.Orders;
import com.cmpe275.cartpool.entities.Store;
import com.cmpe275.cartpool.repos.OrdersRepo;

import java.util.List;

public interface OrderService {
    Orders addOrder(Orders order);

    Orders updateOrder(Orders order);

    List<Orders> getOrders();

    Orders findOrderById(int id);

    int deleteById(int id);

    List<Orders> getOrdersByUserId(int id);

    List<Orders> getOrderByPoolAndStore(String pool_id, int store_id);

    List<Orders> getAllOrdersAssignedToUser(int user_id);

    void changeAssignedToUser(int order_id, int user_id);

    List<Orders> getUnassignedOrdersForStoreInPool(int order_id);

    List<Orders> getUnassignedOrdersInPool(String pool_id);

    //List<Orders> getOrdersByPoolId(int id);

    /*
    List<Orders> getUnassignedOrders(int id);
    */
}

