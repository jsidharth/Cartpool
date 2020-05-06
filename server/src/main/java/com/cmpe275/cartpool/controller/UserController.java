package com.cmpe275.cartpool.controller;

import com.cmpe275.cartpool.entities.Role;
import com.cmpe275.cartpool.entities.User;
import com.cmpe275.cartpool.services.EmailService;
import com.cmpe275.cartpool.services.UserService;
import com.google.firebase.auth.FirebaseToken;
import com.sun.mail.iap.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
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
        //TODO check json ignores
        return ResponseEntity.ok(user.toString());
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        //needs a dto object
        //otherwise return fails
        return userService.getAllUsers();
    }

    @PutMapping("/user")
    public ResponseEntity updateUser(User user, @RequestBody User updatedUser){
        //Can only update the nickname and all that
        if (user.getNickName() != updatedUser.getNickName()){
            if (userService.getUserByNickName(updatedUser.getNickName())!= null){
                return new ResponseEntity<>("This nickname exists", HttpStatus.BAD_REQUEST);
            }
        }
        user.setNickName(updatedUser.getNickName());
        user.setCity(updatedUser.getCity());
        user.setStreet(updatedUser.getStreet());
        user.setState(updatedUser.getState());
        user.setState(updatedUser.getZip());
        user = userService.createUser(user);
        return ResponseEntity.ok(user.toString());
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
