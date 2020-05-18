package com.cmpe275.cartpool.serviceImpl;

import com.cmpe275.cartpool.entities.Pool;
import com.cmpe275.cartpool.entities.PoolMember;
import com.cmpe275.cartpool.entities.User;
import com.cmpe275.cartpool.repos.PoolMemberRepo;
import com.cmpe275.cartpool.repos.PoolRepo;
import com.cmpe275.cartpool.services.PoolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
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
    public List<Pool> searchPools(String name, String neighbourhood, String zipcode) {
        return poolRepo.findByNameContainingOrNeighbourhoodContainingOrZipContainingAndDeletedFalse(name,neighbourhood,zipcode);
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
    @Transactional
    public void addToPool(Pool pool, User user, PoolMember poolMember_tosave) {
        //check number of users is 4
        System.out.println("At add to pool"+pool);
        System.out.println("At add to pool user"+pool);
        if (pool.getPoolMembers()!=null) {
            if (pool.getPoolMembers().size() <4 ) {
                //check if this user is already part of a pool
                PoolMember poolMember = user.getPoolMember();
                if (poolMember != null) {
                    throw new IllegalArgumentException();
                } else {
                    poolMemberRepo.save(poolMember_tosave);
                }
            } else {
                throw new UnsupportedOperationException();
            }
        } else {
            //check if this user is already part of a pool
            PoolMember poolMember = user.getPoolMember();
            if (poolMember != null) {
                throw new IllegalArgumentException();
            } else {
                poolMemberRepo.save(poolMember_tosave);
            }
        }
    }

    @Override
    public void deletePool(Pool pool) {
        poolRepo.delete(pool);
    }
}
