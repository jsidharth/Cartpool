package com.cmpe275.cartpool.entities;

import javax.persistence.*;
import java.util.List;


@Entity
public class Pool {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Column(unique = true)
    private String name;
    private String neighbourhood;
    private String description;
    private String zip;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "poolLeader",referencedColumnName = "id")
    private User poolLeader;


    @OneToMany(mappedBy = "pool")
    private List<PoolMember> poolMembers;


    @OneToMany(mappedBy = "pool")
    private List<Orders> ordersInPool;

    public Pool() {
    }

    public Pool( String name, String neighbourhood, String description, String zip) {
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

    public Integer getId() {
        return id;
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
