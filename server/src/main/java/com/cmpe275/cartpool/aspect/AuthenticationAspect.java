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

@Aspect
@Component
public class AuthenticationAspect {

    @Autowired
    UserService userService;

    @Around("execution(public * com.cmpe275.cartpool.controller.*.*(..))")
    public void checkAuthentication(ProceedingJoinPoint joinPoint) throws Throwable {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        String authHeader = request.getHeader("X-Authorization-Firebase");
        if (authHeader!=null) {
            System.out.println("Auth header : " +authHeader);
            try {
                FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(authHeader);
                User user = userService.getUserByEmail(decodedToken.getEmail());
                if (user!= null){
                    joinPoint.proceed(new Object[]{user, joinPoint.getArgs()});
                } else {
                    //Do this only if joinPoint is not register
                    //register should proceed
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Not authorized");
                }
            }
            catch (Exception e) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Firebase authorized failed");
            }
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Auth header missing");
        }
    }
}
