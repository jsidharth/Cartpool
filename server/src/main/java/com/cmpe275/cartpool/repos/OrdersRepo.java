package com.cmpe275.cartpool.repos;

import com.cmpe275.cartpool.entities.Orders;
import com.cmpe275.cartpool.entities.Pool;
import com.cmpe275.cartpool.entities.Store;
import com.cmpe275.cartpool.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrdersRepo extends JpaRepository<Orders,Integer> {
    List<Orders> findByOrderedByUser(User user);

    List<Orders> findAllByPoolAndStoreId(Pool pool_id, Store store_id);

    List<Orders> findAllByAssignedToUser(User user);

    List<Orders> findAllByAssignedToUserIsNullAndPoolAndStoreId(Pool poolId, Store store_id);

    List<Orders> findAllByAssignedToUserIsNullAndPool(Pool pool_id);
}
