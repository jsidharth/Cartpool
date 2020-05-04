package com.cmpe275.cartpool.controller;

import com.cmpe275.cartpool.entities.Role;
import com.cmpe275.cartpool.entities.User;
import com.cmpe275.cartpool.services.EmailService;
import com.cmpe275.cartpool.services.UserService;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "localhost:3000")
@RestController
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    EmailService emailService;

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

    @GetMapping("/user")
    public ResponseEntity<String> getUser(User user) {
        user = userService.getUserByEmail(user.getEmail());
        return ResponseEntity.ok(user.toString());
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        //needs a dto object
        //otherwise return fails
        return userService.getAllUsers();
    }

    @PostMapping("/sendMail")
    public ResponseEntity sendMail(User user, @RequestParam String screenName, String message) {
        User user2 = userService.getUserByScreenName(screenName);
        if (user2 != null){
            //send email
            emailService.sendMail(user.getScreenName(), user2.getScreenName(), user2.getEmail(), message);
            return ResponseEntity.ok("Mail send");
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }
}
