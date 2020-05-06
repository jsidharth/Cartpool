package com.cmpe275.cartpool.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;


@Entity
public class Pool {

    @Id
    @Column(name = "id")
    private String id;
    @Column(unique = true)
    private String name;
    private String neighbourhood;
    private String description;
    private String zip;


    @OneToOne
    @JsonIgnoreProperties({"poolMember", "assignedOrders", "orderedByUser"})
    @JoinColumn(name = "poolLeader",referencedColumnName = "id")
    private User poolLeader;


    @OneToMany(mappedBy = "pool")
    @JsonIgnoreProperties({"user", "pool"})
    private List<PoolMember> poolMembers;


    @OneToMany(mappedBy = "pool")
    private List<Orders> ordersInPool;

    public Pool() {
    }

    public Pool(String id, String name, String neighbourhood, String description, String zip) {
        this.id = id;
        this.name = name;
        this.neighbourhood = neighbourhood;
        this.description = description;
        this.zip = zip;
    }

    public List<Orders> getOrdersInPool() {
        return ordersInPool;
    }

    public void setOrdersInPool(List<Orders> ordersInPool) {
        this.ordersInPool = ordersInPool;
    }

    public User getPoolLeader() {
        return poolLeader;
    }

    public void setPoolLeader(User poolLeader) {
        this.poolLeader = poolLeader;
    }

    public List<PoolMember> getPoolMembers() {
        return poolMembers;
    }

    public void setPoolMembers(List<PoolMember> poolMembers) {
        this.poolMembers = poolMembers;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNeighbourhood() {
        return neighbourhood;
    }

    public void setNeighbourhood(String neighbourhood) {
        this.neighbourhood = neighbourhood;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }


}
