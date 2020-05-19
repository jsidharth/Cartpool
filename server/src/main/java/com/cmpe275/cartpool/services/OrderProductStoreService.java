package com.cmpe275.cartpool.services;

import com.cmpe275.cartpool.entities.OrderProductStore;
import com.cmpe275.cartpool.entities.Orders;

import java.util.List;

public interface OrderProductStoreService {
    OrderProductStore addOrderProductStore(OrderProductStore orderProductStore);
    List<OrderProductStore> findOrderProductStoreByOrders(Orders orders);
}
