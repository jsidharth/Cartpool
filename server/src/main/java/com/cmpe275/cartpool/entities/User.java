package com.cmpe275.cartpool.entities;

import javax.persistence.*;
import java.util.List;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Integer id;
    private String screenName;
    @Column(unique = true)
    private String nickName;
    @Column(unique = true)
    private String email;
    @Enumerated(EnumType.STRING)
    private Role role;
    private Boolean isVerified;
    private String imgUrl;
    private Integer credit;
    private String street;
    private String city;
    private String state;
    private String zip;
    @OneToOne(mappedBy = "user")
    private PoolMember poolMember;

    @OneToMany(mappedBy = "assignedToUser")
    private List<Orders> assignedOrders;

    @OneToMany(mappedBy = "orderedByUser")
    private List<Orders> ordersPlaced;

    public User() {
    }

    public List<Orders> getOrdersPlaced() {
        return ordersPlaced;
    }

    public void setOrdersPlaced(List<Orders> ordersPlaced) {
        this.ordersPlaced = ordersPlaced;
    }

    public List<Orders> getAssignedOrders() {
        return assignedOrders;
    }

    public void setAssignedOrders(List<Orders> assignedOrders) {
        this.assignedOrders = assignedOrders;
    }

    public PoolMember getPoolMember() {
        return poolMember;
    }

    public void setPoolMember(PoolMember poolMember) {
        this.poolMember = poolMember;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getScreenName() {
        return screenName;
    }

    public void setScreenName(String screenName) {
        this.screenName = screenName;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Boolean getVerified() {
        return isVerified;
    }

    public void setVerified(Boolean verified) {
        isVerified = verified;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public Integer getCredit() {
        return credit;
    }

    public void setCredit(Integer credit) {
        this.credit = credit;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }
}
