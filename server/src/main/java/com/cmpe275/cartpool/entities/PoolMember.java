package com.cmpe275.cartpool.entities;

import javax.persistence.*;

@Entity
public class PoolMember {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;
    private String poolId;
    private Long userId;
    private Long reference;
    private Boolean isRefApproved;
    private Boolean isPlApproved;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPoolId() {
        return poolId;
    }

    public void setPoolId(String poolId) {
        this.poolId = poolId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getReference() {
        return reference;
    }

    public void setReference(Long reference) {
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
