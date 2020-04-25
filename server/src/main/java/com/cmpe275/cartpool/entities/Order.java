package com.cmpe275.cartpool.entities;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Integer id;
    private Integer storeId;
    private Integer userId;
    private Integer poolId;
    @Enumerated(EnumType.STRING)
    private Status status;
    private Integer pickedBy;
    private Float total;
    @Temporal(TemporalType.TIMESTAMP)
    private Date pickedTime;
    @Temporal(TemporalType.TIMESTAMP)
    private Date deliveredTime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getStoreId() {
        return storeId;
    }

    public void setStoreId(Integer storeId) {
        this.storeId = storeId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getPoolId() {
        return poolId;
    }

    public void setPoolId(Integer poolId) {
        this.poolId = poolId;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Integer getPickedBy() {
        return pickedBy;
    }

    public void setPickedBy(Integer pickedBy) {
        this.pickedBy = pickedBy;
    }

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
