package com.cmpe275.cartpool.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender javaMailSender;

    public void sendMail(String senderScreenName, String receiverScreenName, String receiverMail, String message ) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(receiverMail);
        msg.setSubject("CartPool: Message from " + senderScreenName);
        msg.setText(message);
        javaMailSender.send(msg);
    }
}
