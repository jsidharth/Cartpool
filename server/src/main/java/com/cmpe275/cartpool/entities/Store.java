package com.cmpe275.cartpool.entities;

import javax.persistence.*;


@Entity
public class Store {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Integer id;
    @Column(unique = true)
    private String name;
    private String logoUrl;
    private String street;
    private String city;
    private String state;
    private String zip;

    public Store() {
    }

    public Store(String name, String logoUrl, String street, String city, String state, String zip) {
        this.name = name;
        this.logoUrl = logoUrl;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zip = zip;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLogoUrl() {
        return logoUrl;
    }

    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
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
