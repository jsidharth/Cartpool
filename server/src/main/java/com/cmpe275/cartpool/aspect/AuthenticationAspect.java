package com.cmpe275.cartpool.aspect;

import com.cmpe275.cartpool.entities.User;
import com.cmpe275.cartpool.services.UserService;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;

@Aspect
@Component
public class AuthenticationAspect {

    @Autowired
    UserService userService;

    @Around("execution(public * com.cmpe275.cartpool.controller.*.*(..))")
    public Object checkAuthentication(ProceedingJoinPoint joinPoint) throws Throwable {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        String authHeader = request.getHeader("Authorization");
        System.out.println("authheader "+ authHeader);
        if (authHeader!=null) {
            System.out.println("Auth header : " +authHeader);
            try {
                FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(authHeader);
                User user = userService.getUserByEmail(decodedToken.getEmail());
                //System.out.println("User object from firebase :"+ user.getEmail());
                if (joinPoint.getSignature().getName() != "createUser"){
                    if (user!= null){
                        System.out.println("Inside user block");
                        Object[] newargs = joinPoint.getArgs();
                        if (newargs[0] instanceof User) {
                            newargs[0] = user;
                        } else {
                            System.out.println("Not an instance of user"+ newargs[0].getClass().getSimpleName());
                        }
                        System.out.println("Auth went with no issues");
                        return joinPoint.proceed(newargs);
                    } else {
                        //Do this only if joinPoint is not register
                        //register should proceed
                        System.out.println("Indside other block");
                        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Not authorized");
                    }
                } else {
                    System.out.println("Following other path");
                    return joinPoint.proceed();
                }
            }
            catch (Exception e) {
                e.printStackTrace();
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Firebase authorized failed");
            }
        } else {
            Enumeration headerNames = request.getHeaderNames();
            while (headerNames.hasMoreElements()) {
                String key = (String) headerNames.nextElement();
                String value = request.getHeader(key);
                System.out.println("Header : " + key);
                System.out.println("Value : " + value);
            }
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Auth header missing");
        }
    }
}
