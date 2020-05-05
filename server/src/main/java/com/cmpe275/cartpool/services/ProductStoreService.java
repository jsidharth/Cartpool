package com.cmpe275.cartpool.services;

import com.cmpe275.cartpool.entities.ProductStore;

import java.util.List;

public interface ProductStoreService {
    ProductStore addProductToStore(int store, int product);

    List<ProductStore> getAllProductStore();

    int deleteProductFromStore(int store, int product);
}
