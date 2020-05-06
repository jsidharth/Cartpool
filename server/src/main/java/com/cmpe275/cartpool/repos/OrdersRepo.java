package com.cmpe275.cartpool.repos;

import com.cmpe275.cartpool.entities.Orders;
import com.cmpe275.cartpool.entities.Pool;
import com.cmpe275.cartpool.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrdersRepo extends JpaRepository<Orders,Integer> {
    List<Orders> findByOrderedByUser(User user);


}
