package com.cmpe275.cartpool.controller;

import com.cmpe275.cartpool.entities.Pool;
import com.cmpe275.cartpool.entities.PoolMember;
import com.cmpe275.cartpool.entities.User;
import com.cmpe275.cartpool.repos.PoolRepo;
import com.cmpe275.cartpool.services.PoolService;
import com.cmpe275.cartpool.services.UserService;
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

    @PostMapping("/pool")
    public Pool createPool(@RequestBody Pool pool) {
        return poolService.createPool(pool);
    }

    @GetMapping("/pools")
    public List<Pool> getPools() {
        return poolService.getPools();
    }

    @PostMapping("/joinpool")
    public ResponseEntity joinPool(@RequestParam String id, @RequestParam(required = false) String nickName) {
        //get current user object
        //check if current user is in a pool
        //TODO
        //check pool exists
        Pool pool = poolService.getPoolById(id);
        if (pool != null) {
            //if nick name is given, check if nick name is in pool
            Boolean flag = false;
            if (nickName != null) {
                List<PoolMember> poolMembers = pool.getPoolMembers();
                for (PoolMember poolMember: poolMembers) {
                    User user = userService.getUserById(poolMember.getId())
                    if ( user !=null) {
                        if (user.getNickName().equals(nickName)) {
                            flag = true;
                            break;
                        }
                    }
                }
                if (flag) {
                    //send email to the guy
                    //TODO email
                    return ResponseEntity.ok("Email sent to user. Wait for approval");
                } else {
                    return new ResponseEntity<>("This nick name is not in given pool", HttpStatus.BAD_REQUEST);
                }
            } else {
                //need to send email to the pool leader if nick name is not given
                //TODO
                return ResponseEntity.ok("Email sent to PoolAdmin. Wait for approval");
            }
            return ResponseEntity.ok("Request to join pool sent");
        } else {
            return new ResponseEntity<>("pool does not exist", HttpStatus.NOT_FOUND);
        }
    }
}
