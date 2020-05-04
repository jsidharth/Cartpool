package com.cmpe275.cartpool.serviceImpl;

import com.cmpe275.cartpool.entities.User;
import com.cmpe275.cartpool.repos.UserRepo;
import com.cmpe275.cartpool.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepo userRepo;

    @Override
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    @Override
    public User createUser(User user) {
        return userRepo.save(user);
    }

    @Override
    public User getUserById(Integer id) {
        Optional<User> user = userRepo.findById(id);
        return user.orElse(null);
    }

    @Override
    public User getUserByEmail(String email) {
        Optional<User> user = userRepo.findByEmail(email);
        return user.orElse(null);
    }

    @Override
    public User getUserByScreenName(String screenName) {
        Optional<User> user = userRepo.findByScreenName(screenName);
        return user.orElse(null);
    }
}
