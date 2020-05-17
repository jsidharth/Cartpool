package com.cmpe275.cartpool.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.internet.*;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendMail(String senderScreenName, String receiverScreenName, String receiverMail, String subject, String message ) throws MessagingException {

        //SimpleMailMessage msg = new SimpleMailMessage();
//        msg.setTo(receiverMail);
//        msg.setSubject("CartPool: Message from " + senderScreenName);
//        msg.setText(message);
        MimeMessage msg = javaMailSender.createMimeMessage();
        msg.setRecipient(Message.RecipientType.TO, InternetAddress.parse(receiverMail)[0]);
        msg.setSubject(subject);
        Multipart multipart = new MimeMultipart();
        MimeBodyPart htmlPart = new MimeBodyPart();
        htmlPart.setContent(message, "text/html; charset=utf-8");
        multipart.addBodyPart(htmlPart);
        msg.setContent(multipart);
        javaMailSender.send(msg);
    }
}
