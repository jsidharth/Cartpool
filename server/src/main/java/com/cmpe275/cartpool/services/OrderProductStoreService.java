package com.cmpe275.cartpool.services;

import com.cmpe275.cartpool.entities.OrderProductStore;
import com.cmpe275.cartpool.entities.Orders;
import com.cmpe275.cartpool.entities.ProductStore;

import java.util.List;

public interface OrderProductStoreService {
    OrderProductStore addOrderProductStore(OrderProductStore orderProductStore);
    List<OrderProductStore> findOrderProductStoreByOrders(Orders orders);
    Boolean findOrderProductStoreByProductStore(ProductStore productStore);

    List<OrderProductStore> findOrderProductStoreByProductStoresAndActive(List<ProductStore> productStores);
}
