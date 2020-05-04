package com.cmpe275.cartpool.controller;

import com.cmpe275.cartpool.entities.Role;
import com.cmpe275.cartpool.entities.User;
import com.cmpe275.cartpool.services.UserService;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<String> createUser(@RequestBody User user) {
        //input validations before hand
        //is email unique
        if (userService.getUserByEmail(user.getEmail())!= null) {
            return new ResponseEntity<>("User email exists", HttpStatus.BAD_REQUEST);
        }
        //is screen name unique
        if (userService.getUserByScreenName(user.getScreenName())!= null) {
            return new ResponseEntity<>("Screen name exisits", HttpStatus.BAD_REQUEST);
        }
        //Assign role here
        user.setRole(Role.USER);
        userService.createUser(user);
        return ResponseEntity.ok("user created");
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        //needs a dto object
        //otherwise return fails
        return userService.getAllUsers();
    }
}
