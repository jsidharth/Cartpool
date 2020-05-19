package com.cmpe275.cartpool.repos;

import com.cmpe275.cartpool.entities.OrderProductStore;
import com.cmpe275.cartpool.entities.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderProductStoreRepo extends JpaRepository<OrderProductStore,Integer> {
    List<OrderProductStore> findByBelongsToOrder(Orders orders);
}
