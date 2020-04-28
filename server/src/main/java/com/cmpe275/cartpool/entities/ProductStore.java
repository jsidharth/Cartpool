package com.cmpe275.cartpool.entities;

import javax.persistence.*;

@Entity()
public class ProductStore {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Integer id;

    private Integer productId;

    private Integer storeId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "productId",insertable=false,updatable = false)
    Product product;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "storeId",insertable=false,updatable = false)
    Store store;

    public ProductStore() {
    }

    public ProductStore(Integer productId, Integer storeId) {
        this.productId = productId;
        this.storeId = storeId;
    }

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

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public Integer getStoreId() {
        return storeId;
    }

    public void setStoreId(Integer storeId) {
        this.storeId = storeId;
    }
}
