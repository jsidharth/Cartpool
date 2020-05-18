package com.cmpe275.cartpool.serviceImpl;

import com.cmpe275.cartpool.entities.Orders;
import com.cmpe275.cartpool.entities.Pool;
import com.cmpe275.cartpool.entities.Store;
import com.cmpe275.cartpool.entities.User;
import com.cmpe275.cartpool.repos.OrdersRepo;
import com.cmpe275.cartpool.repos.PoolRepo;
import com.cmpe275.cartpool.repos.StoreRepo;
import com.cmpe275.cartpool.repos.UserRepo;
import com.cmpe275.cartpool.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    UserRepo userRepo;

    @Autowired
    OrdersRepo ordersRepo;

    @Autowired
    PoolRepo poolRepo;

    @Autowired
    StoreRepo storeRepo;

    @Override
    public Orders getOrderById(int id) {
        return ordersRepo.findById(id).get();
    }

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

        if(order.getAssignedToUser()!=null) {
            toUpdate.setAssignedToUser(order.getAssignedToUser());
        }
        if(order.getDeliveredTime()!=null) {
            toUpdate.setDeliveredTime(order.getDeliveredTime());
        }
        if(order.getItems()!=null) {
            toUpdate.setItems(order.getItems());
        }
        if(order.getOrderStatus()!=null) {
            toUpdate.setOrderStatus(order.getOrderStatus());
        }
        if(order.getPool()!=null) {
            toUpdate.setPool(order.getPool());
        }
        if(order.getPoolId()!=null) {
            toUpdate.setPoolId(order.getPoolId());
        }
        if(order.getPickedTime()!=null) {
            toUpdate.setPickedTime(order.getPickedTime());
        }
        if(order.getTotal()!=null) {
            toUpdate.setTotal(order.getTotal());
        }

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
            Orders orders = ordersRepo.findById(id).get();
            orders.setActive(false);
            ordersRepo.save(orders);
            System.out.println("updating order with setActive as false");
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

    @Override
    public List<Orders> getOrderByPoolAndStore(String pool, int store_id) {
        Pool pool1 = poolRepo.findPoolById(pool).get();
        Store store = storeRepo.findStoreById(store_id);
        return ordersRepo.findAllByPoolAndStoreId(pool1 , store);
    }

    @Override
    public List<Orders> getAllOrdersAssignedToUser(int user_id) {
        User user = userRepo.findById(user_id).get();
        return ordersRepo.findAllByAssignedToUser(user);
    }

    @Override
    public void changeAssignedToUser(int order_id, int user_id) {
        Orders order = ordersRepo.findById(order_id).get();
        User toAssign = userRepo.findById(user_id).get();

        order.setAssignedToUser(toAssign);

        ordersRepo.save(order);

    }

    @Override
    public List<Orders> getUnassignedOrdersForStoreInPool(int order_id) {
        Orders order = ordersRepo.findById(order_id).get();
        return ordersRepo.findAllByAssignedToUserIsNullAndPoolAndStoreId(order.getPoolId(), order.getStoreId());
    }

    @Override
    public List<Orders> getUnassignedOrdersInPool(String pool_id) {
        Pool pool = poolRepo.findPoolById(pool_id).get();
        return ordersRepo.findAllByAssignedToUserIsNullAndPool(pool);
    }

    @Override
    public Boolean existsByStoreId(int store_id) {
        Store store = storeRepo.findStoreById(store_id);
        return ordersRepo.existsByStoreIdAndActiveTrue(store);
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
