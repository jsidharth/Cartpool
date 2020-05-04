package com.cmpe275.cartpool.repos;

import com.cmpe275.cartpool.entities.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrdersRepo extends JpaRepository<Orders,Integer> {
}
