package com.cmpe275.cartpool;

import com.cmpe275.cartpool.services.EmailService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import javax.mail.MessagingException;

public class EmailTest {
    //@Autowired
    EmailService emailService;

    EmailTest(){
      emailService = new EmailService();
    }

    @Test
    public void testEmail(){
        emailService.sendMail("whatever", "lolz", "jojojoseph09@gmail.com","Test Email",
                    "Whats uppp");
    }

}
