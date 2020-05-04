package com.cmpe275.cartpool.repos;

import com.cmpe275.cartpool.entities.OrderProductStore;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderProductStoreRepo extends JpaRepository<OrderProductStore,Integer> {
}
