package com.cmpe275.cartpool.entities;

import javax.persistence.*;

@Entity
public class ProductStore {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    private Long productId;

    private Long storeId;

    @ManyToOne
    @JoinColumn(name = "productId",insertable=false,updatable = false)
    Product product;

    @ManyToOne
    @JoinColumn(name = "storeId",insertable=false,updatable = false)
    Store store;

    public Store getStore() {
        return store;
    }

    public void setStore(Store store) {
        this.store = store;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Long getStoreId() {
        return storeId;
    }

    public void setStoreId(Long storeId) {
        this.storeId = storeId;
    }
}
