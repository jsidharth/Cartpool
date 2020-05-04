package com.cmpe275.cartpool.serviceImpl;

import com.cmpe275.cartpool.entities.Pool;
import com.cmpe275.cartpool.entities.PoolMember;
import com.cmpe275.cartpool.repos.PoolMemberRepo;
import com.cmpe275.cartpool.repos.PoolRepo;
import com.cmpe275.cartpool.services.PoolMemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PoolMemberServiceImpl implements PoolMemberService {
    @Autowired
    PoolMemberRepo poolMemberRepo;

    @Override
    public PoolMember createPoolMember(PoolMember poolMember) {
        return poolMemberRepo.save(poolMember);
    }
}
