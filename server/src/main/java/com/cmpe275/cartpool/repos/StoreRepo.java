package com.cmpe275.cartpool.repos;

import com.cmpe275.cartpool.entities.Store;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoreRepo extends JpaRepository<Store,Long> {
}
