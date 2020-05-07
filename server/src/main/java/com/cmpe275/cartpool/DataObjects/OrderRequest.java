package com.cmpe275.cartpool.DataObjects;

import com.cmpe275.cartpool.entities.ProductStore;

import java.util.List;

public class OrderRequest {
    int storeId;
    int userId;
    String poolId;
    List<ProductStoreQuantity> productStoreList;

    public int getStoreId() {
        return storeId;
    }

    public void setStoreId(int storeId) {
        this.storeId = storeId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getPoolId() {
        return poolId;
    }

    public void setPoolId(String poolId) {
        this.poolId = poolId;
    }

    public List<ProductStoreQuantity> getProductStoreList() {
        return productStoreList;
    }

    public void setProductStoreList(List<ProductStoreQuantity> productStoreList) {
        this.productStoreList = productStoreList;
    }
}
