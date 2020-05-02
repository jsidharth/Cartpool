package com.cmpe275.cartpool.serviceImpl;

import com.cmpe275.cartpool.entities.Pool;
import com.cmpe275.cartpool.repos.PoolRepo;
import com.cmpe275.cartpool.services.PoolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PoolServiceImpl implements PoolService {

    @Autowired
    PoolRepo poolRepo;

    @Override
    public Pool createPool(Pool pool) {
       return poolRepo.save(pool);
    }

    @Override
    public List<Pool> getPools() {
        return  poolRepo.findAll();
    }

    @Override
    public Pool getPoolByName(String poolName) {
        return poolRepo.findByName(poolName);
    }

    @Override
    public Pool getPoolById(String Id) {
        Optional<Pool> pool = poolRepo.findById(Id);
        if (pool.isPresent()){
            return pool.get();
        } else {
            return null;
        }
    }
}
