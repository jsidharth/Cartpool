package com.cmpe275.cartpool.entities;

import javax.persistence.Entity;

@Entity
public class OrderProductStore {

    private Integer orderId;
    private Integer productOrderStoreId;
    private Integer quantity;

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public Integer getProductOrderStoreId() {
        return productOrderStoreId;
    }

    public void setProductOrderStoreId(Integer productOrderStoreId) {
        this.productOrderStoreId = productOrderStoreId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
