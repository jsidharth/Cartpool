package com.cmpe275.cartpool.repos;

import com.cmpe275.cartpool.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User,Integer> {
    Optional<User> findById(Integer id);
    Optional<User> findByEmail(String email);
    Optional<User> findByScreenName(String screenName);
    Optional<User> findByNickName(String nickName);
}
