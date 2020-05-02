package com.cmpe275.cartpool.services;

import com.cmpe275.cartpool.entities.Pool;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PoolService {
    Pool createPool(Pool pool);
    List<Pool> getPools();
    Pool getPoolByName(String poolName);
    Pool getPoolById(String Id);
}
