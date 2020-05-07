package com.cmpe275.cartpool.repos;

import com.cmpe275.cartpool.entities.PoolMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PoolMemberRepo extends JpaRepository<PoolMember,Integer> {
    Optional<PoolMember> findPoolMemberById(Integer Id);

}

