package com.cmpe275.cartpool.controller;

import com.cmpe275.cartpool.configuration.serverConfig;
import com.cmpe275.cartpool.entities.Role;
import com.cmpe275.cartpool.entities.User;
import com.cmpe275.cartpool.services.EmailService;
import com.cmpe275.cartpool.services.UserService;
import com.fasterxml.jackson.databind.util.JSONPObject;
import com.google.firebase.auth.FirebaseToken;
import com.sun.mail.iap.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000", "http://10.0.0.155:3000"})
@RestController
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    EmailService emailService;

    private String server = serverConfig.getServer();

    @PostMapping("/user")
    public ResponseEntity<String> createUser(@RequestBody User user) {
        //input validations before hand
        //is email unique
        if (userService.getUserByEmail(user.getEmail())!= null) {
            return new ResponseEntity<>("User email exists", HttpStatus.BAD_REQUEST);
        }
        //is screen name unique
        if (userService.getUserByScreenName(user.getScreenName())!= null) {
            return new ResponseEntity<>("Screen name exists", HttpStatus.BAD_REQUEST);
        }
        //Assign role here
        if (user.getEmail().endsWith("@sjsu.edu")){
            user.setRole(Role.ADMIN);
        } else {
            user.setRole(Role.USER);
        }
        user.setCredit(0);
        user.setVerified(false);
        userService.createUser(user);
        String confirmation_url = server+"/user/verify?userEmail="+user.getEmail();
        emailService.sendMail("CartPool",user.getScreenName(), user.getEmail(),"CartPool: Email Verification", "Welcome to CartPool App.\nClick here to confirm your email "+confirmation_url);
        return ResponseEntity.ok("user created");
    }

    @GetMapping("/user/verify")
    public ResponseEntity verifyUser(User user, @RequestParam String userEmail) {
        if (user.getEmail().equals(userEmail)) {
            if (!user.getVerified()) {
                user.setVerified(true);
                userService.createUser(user);
                return ResponseEntity.ok("Verified");
            } else {
                return new ResponseEntity<>("Already verified", HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>("Incorrect email", HttpStatus.FORBIDDEN);
        }
    }

    @GetMapping("/user")
    public ResponseEntity getUser(User user) {
        System.out.println("Getting user at controller"+ user.getEmail());
        user = userService.getUserByEmail(user.getEmail());
        //TODO check json ignores
        System.out.println("After search in repo"+ user.getEmail() + user.getScreenName());
        return ResponseEntity.ok(user);
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
        if (!user.getNickName().equals(updatedUser.getNickName())){
            if (userService.getUserByNickName(updatedUser.getNickName())!= null){
                return new ResponseEntity<>("This nickname exists", HttpStatus.BAD_REQUEST);
            }
        }
        user.setNickName(updatedUser.getNickName());
        user.setCity(updatedUser.getCity());
        user.setStreet(updatedUser.getStreet());
        user.setState(updatedUser.getState());
        user.setZip(updatedUser.getZip());
        user.setImgUrl(updatedUser.getImgUrl());
        user = userService.createUser(user);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/sendMail")
    public ResponseEntity sendMail(User user, @RequestParam String screenName, @RequestParam String message) {
        User user2 = userService.getUserByScreenName(screenName);
        String message2 = emailService.messageHtml(user.getScreenName(), message);
        if (user2 != null){
            //send email
            emailService.sendMail(user.getScreenName(), user2.getScreenName(), user2.getEmail(), "CartPool: Message from "+user.getScreenName(), message2);
            return ResponseEntity.ok("Mail send");
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }
}
