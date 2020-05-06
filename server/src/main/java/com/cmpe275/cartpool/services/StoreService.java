package com.cmpe275.cartpool.services;

import com.cmpe275.cartpool.entities.Store;

import java.util.List;

public interface StoreService {
    //Add a store
    int addStore(Store store);

    //Delete a store
    void deleteStore(int id);

    //Get a store by id
    Store getStoreByName(String name);

    boolean storeExistsByName(String name);

    List<Store> getAllStores();

    Store updateStore(Store store);
}
