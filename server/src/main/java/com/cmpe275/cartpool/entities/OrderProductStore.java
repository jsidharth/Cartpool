package com.cmpe275.cartpool.entities;

import javax.persistence.*;

@Entity
public class OrderProductStore {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;
    private Long orderId;
    private Long productOrderStoreId;
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
        return productOrderStoreId;
    }

    public void setProductOrderStoreId(Long productOrderStoreId) {
        this.productOrderStoreId = productOrderStoreId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
