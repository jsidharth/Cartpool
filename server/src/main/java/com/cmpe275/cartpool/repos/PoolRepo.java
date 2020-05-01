package com.cmpe275.cartpool.repos;

import com.cmpe275.cartpool.entities.Pool;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PoolRepo extends JpaRepository<Pool,String> {
}
