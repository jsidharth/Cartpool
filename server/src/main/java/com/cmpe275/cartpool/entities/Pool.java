package com.cmpe275.cartpool.entities;

import javax.persistence.Column;
import javax.persistence.Id;

public class Pool {

    @Id
    @Column(name = "id")
    private String id;
    @Column(unique = true)
    private String name;
    private String neighbourhood;
    private String description;
    private String zip;
    private Integer poolLeader;


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

    public Integer getPoolLeader() {
        return poolLeader;
    }

    public void setPoolLeader(Integer poolLeader) {
        this.poolLeader = poolLeader;
    }
}
