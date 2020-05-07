package com.cmpe275.cartpool.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name="store",referencedColumnName = "id")
    private Store storeId;
    //private Integer userId;

    @ManyToOne
    @JoinColumn(name="orderedByUser",referencedColumnName = "id")
    @JsonIgnoreProperties({"ordersPlaced","assignedOrders", "poolMember"})
    private User orderedByUser;

    @ManyToOne
    @JoinColumn(name="pool",referencedColumnName = "id")
    //@JsonIgnoreProperties({"poolLeader", "poolMembers", "ordersInPool"})
    @JsonIgnore
    private Pool pool;

    @Enumerated(EnumType.STRING)
    private Status orderStatus;
    //private Integer pickedBy;

    @ManyToOne
    @JoinColumn(name="assignedToUser",referencedColumnName = "id")
    @JsonIgnoreProperties({"ordersPlaced","assignedOrders", "poolMember"})
    private User assignedToUser;

    private Float total;

    @Temporal(TemporalType.TIMESTAMP)
    private Date pickedTime;

    @Temporal(TemporalType.TIMESTAMP)
    private Date deliveredTime;

    @OneToMany(mappedBy = "belongsToOrder")
    @JsonIgnoreProperties({"belongsToOrder","orderedByUser", "order"})
    private List<OrderProductStore> items;

    public Orders(){}

    public Orders(Store store, User user, Pool pool, Status status, User assignedToUser, Float total, Date pickedTime,
                  Date deliveredTime) {
        this.storeId = store;
        this.orderedByUser = user;
        this.pool = pool;
        this.orderStatus = status;
        this.assignedToUser = assignedToUser;
        this.total = total;
        this.pickedTime = pickedTime;
        this.deliveredTime = deliveredTime;
    }


    @JsonIgnore
    public Pool getPool() {
        return pool;
    }

    public void setPool(Pool pool) {
        this.pool = pool;
    }

    public User getAssignedToUser() {
        return assignedToUser;
    }

    public void setAssignedToUser(User assignedToUser) {
        this.assignedToUser = assignedToUser;
    }

    public List<OrderProductStore> getItems() {
        return items;
    }

    public void setItems(List<OrderProductStore> items) {
        this.items = items;
    }

    public User getOrderedByUser() {
        return orderedByUser;
    }

    public void setOrderedByUser(User orderedByUser) {
        this.orderedByUser = orderedByUser;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Store getStoreId() {
        return storeId;
    }

    public void setStoreId(Store storeId) {
        this.storeId = storeId;
    }

//    public Integer getUserId() {
//        return userId;
//    }
//
//    public void setUserId(Integer userId) {
//        this.userId = userId;
//    }

    @JsonIgnore
    public Pool getPoolId() {
        return pool;
    }

    public void setPoolId(Pool poolId) {
        this.pool = poolId;
    }

    public Status getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(Status orderStatus) {
        this.orderStatus = orderStatus;
    }

//    public Integer getPickedBy() {
//        return pickedBy;
//    }
//
//    public void setPickedBy(Integer pickedBy) {
//        this.pickedBy = pickedBy;
//    }

    public Float getTotal() {
        return total;
    }

    public void setTotal(Float total) {
        this.total = total;
    }

    public Date getPickedTime() {
        return pickedTime;
    }

    public void setPickedTime(Date pickedTime) {
        this.pickedTime = pickedTime;
    }

    public Date getDeliveredTime() {
        return deliveredTime;
    }

    public void setDeliveredTime(Date deliveredTime) {
        this.deliveredTime = deliveredTime;
    }
}
