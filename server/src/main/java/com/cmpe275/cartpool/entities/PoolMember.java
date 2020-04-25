package com.cmpe275.cartpool.entities;

import javax.persistence.*;

@Entity
public class PoolMember {
    private String poolId;
    private Integer userId;
    private Integer reference;
    private Boolean isRefApproved;
    private Boolean isPlApproved;

    public String getPoolId() {
        return poolId;
    }

    public void setPoolId(String poolId) {
        this.poolId = poolId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

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
