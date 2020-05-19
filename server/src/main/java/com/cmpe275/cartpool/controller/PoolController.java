package com.cmpe275.cartpool.controller;

import com.cmpe275.cartpool.configuration.serverConfig;
import com.cmpe275.cartpool.entities.Pool;
import com.cmpe275.cartpool.entities.PoolMember;
import com.cmpe275.cartpool.entities.Role;
import com.cmpe275.cartpool.entities.User;
import com.cmpe275.cartpool.services.EmailService;
import com.cmpe275.cartpool.services.PoolMemberService;
import com.cmpe275.cartpool.services.PoolService;
import com.cmpe275.cartpool.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000", "http://10.0.0.155:3000"})
@RestController
public class PoolController {

    @Autowired
    UserService userService;

    @Autowired
    PoolService poolService;

    @Autowired
    PoolMemberService poolMemberService;

    @Autowired
    EmailService emailService;

    private String server = serverConfig.getServer();

    @PostMapping("/pool")
    @Transactional
    public ResponseEntity createPool( User user, @RequestBody Pool pool)
    {
        //check if this user is already having a pool
        if (user.getPoolMember()!=null) {
            if (user.getPoolMember().getRefApproved() && user.getPoolMember().getPlApproved()){
                return new ResponseEntity<>("user already part of a pool", HttpStatus.BAD_REQUEST);
            } else {
                return new ResponseEntity<>("You have a pending join pool request", HttpStatus.BAD_REQUEST);
            }
        }
        //check if this pool id is unique
        if (poolService.getPoolById(pool.getId())!= null) {
            return new ResponseEntity<>("pool with same id exists", HttpStatus.BAD_REQUEST);
        }
        //check if this pool name is unique
        if (poolService.getPoolByName(pool.getName())!= null) {
            return new ResponseEntity<>("pool with same name exists", HttpStatus.BAD_REQUEST);
        }
        //Check if user is verified
        if (!user.getVerified()){
            return new ResponseEntity<>("Please verify your email", HttpStatus.BAD_REQUEST);
        }
        System.out.println("User is " + user.getEmail());
        System.out.println("Checking if pool with "+ pool.getId() + " exists");
        System.out.println("Pool "+ poolService.getPoolById(pool.getId()));
        //create a poolmember object
        pool = poolService.createPool(pool);
        pool.setPoolLeader(user);
        pool = poolService.createPool(pool);
        PoolMember poolMember = new PoolMember(user, 0, true, true, pool);
        poolMember = poolMemberService.createPoolMember(poolMember);
        poolService.addToPool(pool,user,poolMember);
        return ResponseEntity.ok("created pool");
    }

    @PutMapping("/pool")
    @Transactional
    public ResponseEntity editPool( User user, @RequestBody Pool pool)
    {
        if (pool.getPoolLeader() == user){
            Pool poolUpdated = poolService.getPoolById(pool.getId());
            poolUpdated.setName(pool.getName());
            poolUpdated.setNeighbourhood(pool.getNeighbourhood());
            poolUpdated.setDescription(pool.getDescription());
            poolUpdated = poolService.createPool(poolUpdated);
            return ResponseEntity.ok(poolUpdated);
        } else {
            return new ResponseEntity<>("You are not admin of this pool", HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/pools")
    public ResponseEntity getPools(User user, @RequestParam(required = false) String name, @RequestParam(required = false) String neighbourhood, @RequestParam(required = false) String zipcode ) {
        if (name == null){
            name = "";
        }
        if (neighbourhood == null){
            neighbourhood = "";
        }
        if (zipcode == null){
            zipcode = "";
        }
        List<Pool> pools = poolService.searchPools(name,neighbourhood,zipcode);
         for (Pool pool: pools){
             List<String> memberNickNames = new ArrayList<>();
             for(PoolMember poolMember: pool.getPoolMembers()){
                 if (poolMember.getRefApproved() && poolMember.getPlApproved()) {
                     memberNickNames.add(poolMember.getUser().getNickName());
                 }
             }
             pool.setUserNickNamesTransient(memberNickNames);
         }
         return ResponseEntity.ok(pools);
    }

    @PostMapping("/joinpool")
    public ResponseEntity joinPool(User user, @RequestParam String poolId, @RequestParam(required = false) String screenName) {
        //get current user object
        //check if current user is in a pool
        //create a poolmember object to save
        PoolMember poolMember_for_user;
        String url_for_approval;
        if (user != null){
            if (user.getPoolMember() != null) {
                if (user.getPoolMember().getPlApproved() && user.getPoolMember().getRefApproved()){
                    return new ResponseEntity<>("user already part of a pool", HttpStatus.BAD_REQUEST);
                } else {
                    return new ResponseEntity<>("You already have a join request pending", HttpStatus.BAD_REQUEST);
                }
            }
            if (!user.getVerified()) {
                return new ResponseEntity<>("Please verify your email", HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>("user does not exist in backend", HttpStatus.BAD_REQUEST);
        }

        //check pool exists
        Pool pool = poolService.getPoolById(poolId);
        if (pool != null) {
            //if nick name is given, check if nick name is in pool
            Boolean flag = false;
            User user_ = null;
            if (screenName != null) {
                List<PoolMember> poolMembers = pool.getPoolMembers();
                for (PoolMember poolMember: poolMembers) {
                    System.out.println("Iterating over pool members"+poolMember.getUser().getEmail());
                    user_ = poolMember.getUser();
                    if ( user_ !=null) {
                        if (user_.getScreenName().equals(screenName)) {
                            flag = true;
                            break;
                        }
                    }
                }
                if (flag) {
                    //send email to the guy
                    //TODO email
                    poolMember_for_user = new PoolMember(user, user_.getId(), false, false, pool);
                    poolMember_for_user = poolMemberService.createPoolMember(poolMember_for_user);
                    url_for_approval = server+"pool/approve?poolMemberId="+poolMember_for_user.getId();
                    url_for_approval = emailService.poolJoinHtml(user.getScreenName(), url_for_approval);
                    emailService.sendMail(user.getScreenName(), user_.getScreenName(), user_.getEmail(),"CartPool: Pool Request", url_for_approval);
                    return ResponseEntity.ok("Email sent to user. Wait for approval");
                } else {
                    return new ResponseEntity<>("This screen name is not in given pool", HttpStatus.BAD_REQUEST);
                }
            } else {
                //need to send email to the pool leader if screen name is not given
                //TODO
                //find admin of this pool
                user_ = pool.getPoolLeader();
                if(user_ != null) {
                    poolMember_for_user = new PoolMember(user, user_.getId(), false, false, pool);
                    poolMember_for_user = poolMemberService.createPoolMember(poolMember_for_user);
                    url_for_approval = server+"pool/approve?poolMemberId="+poolMember_for_user.getId();
                    url_for_approval = emailService.poolJoinHtml(user.getScreenName(), url_for_approval);
                    emailService.sendMail(user.getScreenName(), user_.getScreenName(), user_.getEmail(),"CartPool: Pool Request", url_for_approval);
                    return ResponseEntity.ok("Email sent to PoolAdmin. Wait for approval");
                } else {
                    return new ResponseEntity<>("Cannot find admin of this pool", HttpStatus.NOT_FOUND);
                }
            }
        } else {
            return new ResponseEntity<>("pool does not exist", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/pool")
    public ResponseEntity getPool(User user) {
        //Return current users pool
        if (user.getPoolMember() != null ){
            PoolMember poolMember_user = user.getPoolMember();
            if (!(poolMember_user.getPlApproved() && poolMember_user.getRefApproved())) {
                return new ResponseEntity<>("You are pending approvals", HttpStatus.NOT_FOUND);
            }
            Pool pool = user.getPoolMember().getPool();
            List<String> memberNickNames = new ArrayList<>();
            List<String> memberScreenNames = new ArrayList<>();
            for(PoolMember poolMember: pool.getPoolMembers()){
                if (poolMember.getRefApproved() && poolMember.getPlApproved()) {
                    memberNickNames.add(poolMember.getUser().getNickName());
                    memberScreenNames.add(poolMember.getUser().getScreenName());
                }
            }
            pool.setUserNickNamesTransient(memberNickNames);
            pool.setUserScreenNamesTransient(memberScreenNames);
            String leaderScreenName = pool.getPoolLeader().getScreenName();
            pool.setPoolLeaderScreenNameTransient(leaderScreenName);
            return ResponseEntity.ok(pool);
        } else {
            return new ResponseEntity<>("You are not part of any pools", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/pool/approve")
    public ResponseEntity approvePool(User user, @RequestParam Integer poolMemberId, @RequestParam Boolean accept) {
        //check if this request is there
        PoolMember poolMember = poolMemberService.getPoolMemberById(poolMemberId);
        User user_ = poolMember.getUser();
        PoolMember poolMemberApprover = user.getPoolMember();
        User admin_ = poolMemberApprover.getPool().getPoolLeader();
        if (poolMember != null) {
            if ((poolMember.getReference().equals(user.getId())) || (admin_ == poolMemberApprover.getUser())) {
                if (poolMember.getPlApproved() && poolMember.getRefApproved()) {
                    return new ResponseEntity<>("This request is already approved", HttpStatus.BAD_REQUEST);
                } else {
                    //This is the leader
                    if (poolMemberApprover.getReference() == 0){
                        if (accept) {
                            poolMember.setRefApproved(true);
                            poolMember.setPlApproved(true);
                            //mail the user saying request accepted
                            emailService.sendMail(user.getScreenName(), user_.getScreenName(), user_.getEmail(),"CartPool: Pool Request Accepted", emailService.messageHtml(user.getScreenName(), "Your pool join request has been accepted"));
                        } else {
                            //mail the user saying request denied
                            emailService.sendMail(user.getScreenName(), user_.getScreenName(), user_.getEmail(),"CartPool: Pool Request Rejected", emailService.messageHtml(user.getScreenName(), "Your pool join request has been rejected"));
                            //delete the request
                            poolMemberService.deletePoolMember(poolMember);
                        }
                    } else {
                        //not leader
                        if (accept) {
                            poolMember.setRefApproved(true);
                            //mail the user saying request pending
                            emailService.sendMail(user.getScreenName(), user_.getScreenName(), user_.getEmail(),"CartPool: Pool Request Pending", emailService.messageHtml(user.getScreenName(), "Your pool join request is pending admin approval"));
                            String url_for_approval = server+"pool/approve?poolMemberId="+poolMember.getId();
                            url_for_approval = emailService.poolJoinHtml(user_.getScreenName(), url_for_approval);
                            emailService.sendMail(user_.getScreenName(), admin_.getScreenName(), admin_.getEmail(),"CartPool: Pool Request", url_for_approval);
                        } else {
                            //mail the user saying request denied
                            emailService.sendMail(user.getScreenName(), user_.getScreenName(), user_.getEmail(),"CartPool: Pool Request Rejected", emailService.messageHtml(user.getScreenName(), "Your pool join request has been rejected"));
                            //delete the request
                            poolMemberService.deletePoolMember(poolMember);
                        }
                    }
                    //will this save work?
                    poolMemberService.createPoolMember(poolMember);
                    if (poolMemberApprover.getReference() == 0) {
                        return ResponseEntity.ok("Approved request");
                    } else {
                        return ResponseEntity.ok("Approved request and sent email to admin");
                    }
                }
            } else {
                return new ResponseEntity<>("You are not authorized for this pool action", HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<>("This request is invalid", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/leavepool")
    public ResponseEntity deletePoolRequest(User user) {
        PoolMember poolMember = user.getPoolMember();
        if (poolMember != null) {
            if (poolMember.getReference() == 0 ){
                //give admin role to some one else
                //This is admin
                //Can't leave
                return new ResponseEntity<>("Admin cannot leave his pool", HttpStatus.BAD_REQUEST);
            }
            poolMemberService.deletePoolMember(poolMember);
            //if admin deletes his membership, transfer the ownership to someone else??
            return ResponseEntity.ok("Left pool");
        } else {
            return new ResponseEntity<>("Not part of any pool", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/deletepool")
    public ResponseEntity deletePool(User user) {
        //TODO make transactions
        PoolMember poolMember = user.getPoolMember();
        if (poolMember != null) {
            if (poolMember.getReference() == 0 ){
                Pool pool = poolMember.getPool();
                if (pool.getPoolMembers().size() == 1) {
                    poolMemberService.deletePoolMember(poolMember);
                    poolService.deletePool(pool);
                    return ResponseEntity.ok("Deleted pool");
                } else{
                    return new ResponseEntity<>("This pool has members", HttpStatus.BAD_REQUEST);
                }
            } else {
                return new ResponseEntity<>("Not a pool admin", HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>("Not part of any pool", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/testemail")
    public void testEmail(User user){
            emailService.sendMail("whatever", "lolz", "sushant.post@gmail.com","Test email",
                    "Whats uppp");
    }
}
