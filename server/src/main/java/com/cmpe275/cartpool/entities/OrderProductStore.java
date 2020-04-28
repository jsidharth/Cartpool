package com.cmpe275.cartpool.entities;

import javax.persistence.*;

@Entity
public class OrderProductStore {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Integer id;
    //private Integer orderId;
    //private Integer productStoreId;
    private Integer quantity;

    @ManyToOne
    @JoinColumn(name="belongsToOrder",referencedColumnName = "id")
    private Orders belongsToOrder;

    @ManyToOne
    @JoinColumn(name = "productStore",referencedColumnName = "id")
    private ProductStore productStore;

    public OrderProductStore() {
    }

    public ProductStore getProductStore() {
        return productStore;
    }

    public void setProductStore(ProductStore productStore) {
        this.productStore = productStore;
    }

    public Orders getOrder() {
        return belongsToOrder;
    }

    public void setOrder(Orders order) {
        this.belongsToOrder = order;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

//    public Integer getOrderId() {
//        return orderId;
//    }
//
//    public void setOrderId(Integer orderId) {
//        this.orderId = orderId;
//    }

//    public Integer getProductOrderStoreId() {
//        return productStoreId;
//    }
//
//    public void setProductOrderStoreId(Integer productStoreId) {
//        this.productStoreId = productStoreId;
//    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
