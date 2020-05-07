package com.cmpe275.cartpool.serviceImpl;

import com.cmpe275.cartpool.entities.OrderProductStore;
import com.cmpe275.cartpool.repos.OrderProductStoreRepo;
import com.cmpe275.cartpool.services.OrderProductStoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderProductStoreServiceImpl implements OrderProductStoreService {

    @Autowired
    OrderProductStoreRepo orderProductStoreRepo;

    @Override
    public OrderProductStore addOrderProductStore(OrderProductStore orderProductStore) {
        return orderProductStoreRepo.save(orderProductStore);
    }
}
