package com.cmpe275.cartpool.repos;

import com.cmpe275.cartpool.entities.Pool;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PoolRepo extends JpaRepository<Pool,String> {
    Pool findPoolByName(String poolName);
    Optional<Pool> findPoolById(String Id);
}
