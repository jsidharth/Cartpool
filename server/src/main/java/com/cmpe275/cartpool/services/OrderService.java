package com.cmpe275.cartpool.services;

import com.cmpe275.cartpool.entities.Orders;
import com.cmpe275.cartpool.repos.OrdersRepo;

import java.util.List;

public interface OrderService {
    Orders addOrder(Orders order);

    Orders updateOrder(Orders order);

    List<Orders> getOrders();

    Orders findOrderById(int id);

    int deleteById(int id);

    List<Orders> getOrdersByUserId(int id);
}
