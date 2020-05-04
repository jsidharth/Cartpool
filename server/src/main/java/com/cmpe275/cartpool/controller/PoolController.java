package com.cmpe275.cartpool.controller;

import com.cmpe275.cartpool.entities.Pool;
import com.cmpe275.cartpool.entities.PoolMember;
import com.cmpe275.cartpool.entities.User;
import com.cmpe275.cartpool.repos.PoolMemberRepo;
import com.cmpe275.cartpool.repos.PoolRepo;
import com.cmpe275.cartpool.services.PoolMemberService;
import com.cmpe275.cartpool.services.PoolService;
import com.cmpe275.cartpool.services.UserService;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.internal.FirebaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PoolController {

    @Autowired
    UserService userService;

    @Autowired
    PoolService poolService;

    @Autowired
    PoolMemberService poolMemberService;

    @PostMapping("/pool")
    public ResponseEntity createPool( User user, @RequestBody Pool pool)
    {
        //check if this user is already having a pool
        if (user.getPoolMember()!=null) {
            return new ResponseEntity<>("user already part of a pool", HttpStatus.BAD_REQUEST);
        }
        //check if this pool id is unique
        if (poolService.getPoolById(pool.getId())!= null) {
            return new ResponseEntity<>("pool with same id exists", HttpStatus.BAD_REQUEST);
        }
        //check if this pool name is unique
        if (poolService.getPoolByName(pool.getName())!= null) {
            return new ResponseEntity<>("pool with same name exists", HttpStatus.BAD_REQUEST);
        }
        System.out.println("User is " + user.getEmail());
        System.out.println("Checking if pool with "+ pool.getId() + " exists");
        System.out.println("Pool "+ poolService.getPoolById(pool.getId()));
        //create a poolmember object
        pool = poolService.createPool(pool);
        pool.setPoolLeader(user);
        poolService.createPool(pool);
        poolService.addToPool(pool,user);
        PoolMember poolMember = new PoolMember(user, 0, true, true, pool);
        poolMemberService.createPoolMember(poolMember);
        return ResponseEntity.ok("created pool");
    }

    @GetMapping("/pools")
    public List<Pool> getPools() {
        //Check if admin then return pools
        return poolService.getPools();
    }

    @PostMapping("/joinpool")
    public ResponseEntity joinPool(User user, @RequestParam String id, @RequestParam(required = false) String nickName) {
        //get current user object
        //check if current user is in a pool
        if (user != null){
            if (user.getPoolMember() != null) {
                return new ResponseEntity<>("user already part of a pool", HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>("user does not exist in backend", HttpStatus.BAD_REQUEST);
        }

        //check pool exists
        Pool pool = poolService.getPoolById(id);
        if (pool != null) {
            //if nick name is given, check if nick name is in pool
            Boolean flag = false;
            if (nickName != null) {
                List<PoolMember> poolMembers = pool.getPoolMembers();
                for (PoolMember poolMember: poolMembers) {
                    User user_ = userService.getUserById(poolMember.getId());
                    if ( user_ !=null) {
                        if (user_.getNickName().equals(nickName)) {
                            flag = true;
                            break;
                        }
                    }
                }
                if (flag) {
                    //send email to the guy
                    //TODO email
                    //once email is confirmed by admin/other user
                    //then you can call the other id
                    return ResponseEntity.ok("Email sent to user. Wait for approval");
                } else {
                    return new ResponseEntity<>("This nick name is not in given pool", HttpStatus.BAD_REQUEST);
                }
            } else {
                //need to send email to the pool leader if nick name is not given
                //TODO
                return ResponseEntity.ok("Email sent to PoolAdmin. Wait for approval");
            }
        } else {
            return new ResponseEntity<>("pool does not exist", HttpStatus.NOT_FOUND);
        }
    }
}
