package com.cmpe275.cartpool.services;

import com.cmpe275.cartpool.entities.OrderProductStore;
import com.cmpe275.cartpool.entities.Orders;
import com.cmpe275.cartpool.entities.Status;
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

    @Autowired
    OrderService orderService;

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

    public String orderHtml(Status orderStatus, int orderId) {
        Orders orders = orderService.getOrderById(orderId);
        StringBuilder htmlBuilder = new StringBuilder();
        htmlBuilder.append("<html>");
        if (orderStatus == Status.ORDER_PICKED) {
            htmlBuilder.append("<head><title>Your order has been picked up</title></head>");
        } else if (orderStatus == Status.ORDER_PLACED) {
            htmlBuilder.append("<head><title>Your order has been placed</title></head>");
        } else if (orderStatus == Status.ORDER_DELIVERED) {
            htmlBuilder.append("<head><title>Your order has been delivered</title></head>");
        } else if (orderStatus == Status.ORDER_NOT_DELIVERED) {
            htmlBuilder.append("<head><title>User reported the order is not delivered</title></head>");
        }
        htmlBuilder.append("<body><p>Order ID : "+orderId+"</p>");
        htmlBuilder.append("<p>Store Name : "+orders.getStoreId().getName()+"</p>");
        htmlBuilder.append("<table>");
        htmlBuilder.append("<tr>\n" +
                "    <th>Item</th>\n" +
                "    <th>Quantity</th>\n" +
                "    <th>Cost</th>\n" +
                "  </tr>");
        for(OrderProductStore item: orders.getItems()){
            htmlBuilder.append("<tr><td>"+item.getProductStore().getProduct().getName()+"</td><td>"+
                    item.getQuantity()
                    +"</td><td>"+
                    item.getProductStore().getProduct().getPrice()
                    +"</td></tr>");
        }
        htmlBuilder.append("<tr>\n" +
                "    <td>:</td>\n" +
                "    <td>Total</td>\n" +
                "    <td>"+orders.getTotal()+"</td>\n" +
                "  </tr>");
        htmlBuilder.append("</table>");
        if (orderStatus == Status.ORDER_PICKED) {
            htmlBuilder.append("<p>Your order was picked up at "+orders.getPickedTime()+" by "+orders.getAssignedToUser().getScreenName()+"</p>");
        } else if (orderStatus == Status.ORDER_PLACED) {
            htmlBuilder.append("<p>Your order has been placed at "+ orders.getPlacedTime() +"</p>");
        } else if (orderStatus == Status.ORDER_DELIVERED) {
            htmlBuilder.append("<p>Your order has been delivered at "+orders.getDeliveredTime()+"</p>");
        } else if (orderStatus == Status.ORDER_NOT_DELIVERED) {
            htmlBuilder.append("<p>"+orders.getScreenName()+" reported the order as not delivered </p>");
        }
        htmlBuilder.append("</body>");
        htmlBuilder.append("</html>");
        String html = htmlBuilder.toString();
        return html;
    }
}
