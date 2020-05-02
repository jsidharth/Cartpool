package com.cmpe275.cartpool.controller;

import com.cmpe275.cartpool.entities.Pool;
import com.cmpe275.cartpool.entities.Role;
import com.cmpe275.cartpool.entities.User;
import com.cmpe275.cartpool.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/user")
    public User createUser(@RequestBody User user) {
        //input validations before hand
        //is email unique
        //is screen name unique
        //user @Before
        //Assign role here
        user.setRole(Role.USER);
        return userService.createUser(user);
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        //needs a dto object
        //otherwise return fails
        return userService.getAllUsers();
    }
}
