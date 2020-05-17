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

    public void sendMail(String senderScreenName, String receiverScreenName, String receiverMail, String subject, String message ) {

        //SimpleMailMessage msg = new SimpleMailMessage();
//        msg.setTo(receiverMail);
//        msg.setSubject("CartPool: Message from " + senderScreenName);
//        msg.setText(message);
        MimeMessage msg = javaMailSender.createMimeMessage();
        try {
            msg.setRecipient(Message.RecipientType.TO, InternetAddress.parse(receiverMail)[0]);
            msg.setSubject(subject);
            Multipart multipart = new MimeMultipart();
            MimeBodyPart htmlPart = new MimeBodyPart();
            htmlPart.setContent(message, "text/html; charset=utf-8");
            multipart.addBodyPart(htmlPart);
            msg.setContent(multipart);
            javaMailSender.send(msg);
        } catch(MessagingException e) {
            e.printStackTrace();
        }
    }

    public String messageHtml(String sender, String message) {
        //Adding the necessary html tags
        //TODO if there is javascript in message then we are f'd
        StringBuilder htmlBuilder = new StringBuilder();
        htmlBuilder.append("<html>");
        htmlBuilder.append("<head><title>"+sender+" sent you a message</title></head>");
        htmlBuilder.append("<body><p>"+message +"</p></body>");
        htmlBuilder.append("</html>");
        String html = htmlBuilder.toString();
        return html;
    }

    public String poolJoinHtml(String sender, String url) {
        StringBuilder htmlBuilder = new StringBuilder();
        htmlBuilder.append("<html>");
        htmlBuilder.append("<head><title>"+sender+" wants to join your pool</title></head>");
        htmlBuilder.append("<body><p>Click below to accept or decline</p>");
        htmlBuilder.append("<p><a href=\""+url+"&accept=true\">Accept</a></p>");
        htmlBuilder.append("<p><a href=\""+url+"&accept=false\">Decline</a></p></body>");
        htmlBuilder.append("</html>");
        String html = htmlBuilder.toString();
        return html;
    }
}
