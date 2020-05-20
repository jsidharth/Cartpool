package com.cmpe275.cartpool.serviceImpl;

import com.cmpe275.cartpool.entities.OrderProductStore;
import com.cmpe275.cartpool.entities.Orders;
import com.cmpe275.cartpool.entities.ProductStore;
import com.cmpe275.cartpool.repos.OrderProductStoreRepo;
import com.cmpe275.cartpool.services.OrderProductStoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderProductStoreServiceImpl implements OrderProductStoreService {

    @Autowired
    OrderProductStoreRepo orderProductStoreRepo;

    @Override
    public OrderProductStore addOrderProductStore(OrderProductStore orderProductStore) {
        return orderProductStoreRepo.saveAndFlush(orderProductStore);
    }

    @Override
    public List<OrderProductStore> findOrderProductStoreByOrders(Orders orders) {
        return orderProductStoreRepo.findByBelongsToOrder(orders);
    }

    @Override
    public Boolean findOrderProductStoreByProductStore(ProductStore productStore) {
        List<OrderProductStore> orders = orderProductStoreRepo.findByProductStore(productStore);
        for (OrderProductStore order: orders) {
            if (order.getOrder().getActive()){
                return true;
            }
        }
        return false;
    }

    @Override
    public List<OrderProductStore> findOrderProductStoreByProductStoresAndActive(List<ProductStore> productStores) {
        return orderProductStoreRepo.findByProductStoreInAndBelongsToOrder_ActiveTrue(productStores);
    }
}
