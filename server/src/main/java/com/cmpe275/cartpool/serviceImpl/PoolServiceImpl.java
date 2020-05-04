package com.cmpe275.cartpool.serviceImpl;

import com.cmpe275.cartpool.entities.Pool;
import com.cmpe275.cartpool.entities.PoolMember;
import com.cmpe275.cartpool.entities.User;
import com.cmpe275.cartpool.repos.PoolMemberRepo;
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

    @Autowired
    PoolMemberRepo poolMemberRepo;

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
        return poolRepo.findPoolByName(poolName);
    }

    @Override
    public Pool getPoolById(String Id) {
        Optional<Pool> pool = poolRepo.findPoolById(Id);
        return pool.orElse(null);
    }

    @Override
    public void addToPool(Pool pool, User user) {
        //check number of users is 4
        if (pool.getPoolMembers().size() <4) {
            //check if this user is already part of a pool
            PoolMember poolMember = user.getPoolMember();
            if (poolMember != null) {
                throw new IllegalArgumentException();
            } else {
                poolMember = new PoolMember(user, user.getId(), false, false, pool);
                poolMemberRepo.save(poolMember);
            }
        } else {
            throw new UnsupportedOperationException();
        }
    }
}
