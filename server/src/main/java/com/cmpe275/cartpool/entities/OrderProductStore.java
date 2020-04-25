package com.cmpe275.cartpool.entities;

import javax.persistence.*;

@Entity
public class OrderProductStore {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;
    private Long orderId;
    private Long productStoreId;
    private Integer quantity;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Long getProductOrderStoreId() {
        return productStoreId;
    }

    public void setProductOrderStoreId(Long productStoreId) {
        this.productStoreId = productStoreId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
