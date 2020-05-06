package com.cmpe275.cartpool.serviceImpl;

import com.cmpe275.cartpool.entities.Orders;
import com.cmpe275.cartpool.entities.User;
import com.cmpe275.cartpool.repos.OrdersRepo;
import com.cmpe275.cartpool.repos.UserRepo;
import com.cmpe275.cartpool.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    UserRepo userRepo;

    @Autowired
    OrdersRepo ordersRepo;

    @Override
    public Orders addOrder(Orders order) {
        return ordersRepo.save(order);
    }

    @Override
    public Orders updateOrder(Orders order) {
        if(!ordersRepo.existsById(order.getId())){
            //TODO: Handle error properly
            return null;
        }
        Orders toUpdate = ordersRepo.findById(order.getId()).get();

        toUpdate.setAssignedToUser(order.getAssignedToUser());
        toUpdate.setAssignedToUsr(order.getAssignedToUsr());
        toUpdate.setDeliveredTime(order.getDeliveredTime());
        toUpdate.setItems(order.getItems());
        toUpdate.setOrderStatus(order.getOrderStatus());
        toUpdate.setPool(order.getPool());
        toUpdate.setPoolId(order.getPoolId());
        toUpdate.setPickedTime(order.getPickedTime());
        toUpdate.setTotal(order.getTotal());
        toUpdate.setOrderedByUser(order.getOrderedByUser());

        return ordersRepo.save(toUpdate);

    }

    @Override
    public List<Orders> getOrders() {
        return ordersRepo.findAll();
    }

    @Override
    public Orders findOrderById(int id) {
        if(ordersRepo.existsById(id)) {
            return ordersRepo.findById(id).get();
        }else{
            //TODO: Handle error properly
            return null;
        }
    }

    @Override
    public int deleteById(int id) {
        if(ordersRepo.existsById(id)) {
            ordersRepo.deleteById(id);
            return 0;
        }else{
            //The entry doesn't exist
            return -1;
        }
    }

    @Override
    public List<Orders> getOrdersByUserId(int id) {
        if(!userRepo.existsById(id)){
           return null;
        }
        User user = userRepo.findById(id).get();
        return ordersRepo.findByOrderedByUser(user);
    }

    /*
    @Override
    public List<Orders> getOrdersByPoolId(int id) {
        return ordersRepo.findByPoolId(id);
    }


    @Override
    public List<Orders> getUnassignedOrders(int id){
        return ordersRepo.findAllByAssignedToUserIsNullAndPoolId(id);
    }

    */
}
