package com.cmpe275.cartpool.services;

import com.cmpe275.cartpool.entities.Pool;
import com.cmpe275.cartpool.entities.PoolMember;
import org.springframework.stereotype.Service;

@Service
public interface PoolMemberService {
    public PoolMember createPoolMember(PoolMember poolMember);
    PoolMember getPoolMemberById(Integer Id);
    void deletePoolMember(PoolMember poolMember);
}
