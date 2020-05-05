package com.cmpe275.cartpool.serviceImpl;

import com.cmpe275.cartpool.entities.ProductStore;
import com.cmpe275.cartpool.repos.ProductRepo;
import com.cmpe275.cartpool.repos.ProductStoreRepo;
import com.cmpe275.cartpool.repos.StoreRepo;
import com.cmpe275.cartpool.services.ProductStoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductStoreServiceImpl implements ProductStoreService {

    @Autowired
    ProductStoreRepo productStoreRepo;
    @Autowired
    ProductRepo productRepo;
    @Autowired
    StoreRepo storeRepo;

    @Override
    public List<ProductStore> getAllProductStore() {
        return productStoreRepo.findAll();
    }

    @Override
    public int deleteProductFromStore(int store, int product) {
        int toDelete =0 ;
        if(productStoreRepo.existsByStoreIdAndProductId(store,product)){
            toDelete = productStoreRepo.findByStoreIdAndProductId(store, product).getId();
            productStoreRepo.deleteById(toDelete);
        }else{
            //TODO: Throw error that the mapping doesn't exist
        }
        return toDelete;
    }

    @Override
    public ProductStore addProductToStore(int store, int product) {
        //TODO:Checks, store exists, product exists & a mapping already exists or not
        if(storeRepo.existsById(store) && productRepo.existsById(product)) {
            if(productStoreRepo.existsByStoreIdAndProductId(store,product)) {
                //TODO:Throw error that the mapping already exists

            }else {
                ProductStore productStore = new ProductStore(product, store);
                ProductStore savedProductStore = productStoreRepo.save(productStore);
                return savedProductStore;
            }
        }
        return new ProductStore();
    }
}
