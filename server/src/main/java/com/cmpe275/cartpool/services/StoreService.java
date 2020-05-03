package com.cmpe275.cartpool.services;

import com.cmpe275.cartpool.entities.Store;

import java.util.List;

public interface StoreService {
    //Add a store
    int addStore(Store store);

    //Delete a store
    int deleteStore(String name);

    //Get a store by id
    Store getStoreByName(String name);

    boolean storeExistsByName(String name);

    List<Store> getAllStores();
}
