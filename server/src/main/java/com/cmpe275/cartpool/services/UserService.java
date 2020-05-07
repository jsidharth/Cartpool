package com.cmpe275.cartpool.services;

import com.cmpe275.cartpool.entities.User;

import java.util.List;

public interface UserService {

    List<User> getAllUsers();
    User createUser(User user);
    User getUserById(Integer id);
    User getUserByEmail(String email);
    User getUserByScreenName(String screenName);
    User getUserByNickName(String nickName);
}
