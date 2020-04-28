package com.cmpe275.cartpool.entities;

import javax.persistence.*;

@Entity
public class PoolMember {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Integer id;
    //@Column(nullable=false)
    //private String poolId;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user",referencedColumnName = "id")
    private User user;
    private Integer reference;
    private Boolean isRefApproved;
    private Boolean isPlApproved;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="pool",referencedColumnName = "id")
    private Pool pool;

    public PoolMember() {
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Pool getPool() {
        return pool;
    }

    public void setPool(Pool pool) {
        this.pool = pool;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

//    public String getPoolId() {
//        return poolId;
//    }
//
//    public void setPoolId(String poolId) {
//        this.poolId = poolId;
//    }

//    public Integer getUserId() {
//        return userId;
//    }
//
//    public void setUserId(Integer userId) {
//        this.userId = userId;
//    }

    public Integer getReference() {
        return reference;
    }

    public void setReference(Integer reference) {
        this.reference = reference;
    }

    public Boolean getRefApproved() {
        return isRefApproved;
    }

    public void setRefApproved(Boolean refApproved) {
        isRefApproved = refApproved;
    }

    public Boolean getPlApproved() {
        return isPlApproved;
    }

    public void setPlApproved(Boolean plApproved) {
        isPlApproved = plApproved;
    }
}
