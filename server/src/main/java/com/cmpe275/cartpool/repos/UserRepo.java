package com.cmpe275.cartpool.repos;

import com.cmpe275.cartpool.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User,Integer> {
}
