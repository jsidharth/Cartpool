package com.cmpe275.cartpool.serviceImpl;

import com.cmpe275.cartpool.entities.Orders;
import com.cmpe275.cartpool.entities.Product;
import com.cmpe275.cartpool.entities.ProductStore;
import com.cmpe275.cartpool.entities.Store;
import com.cmpe275.cartpool.repos.ProductRepo;
import com.cmpe275.cartpool.repos.ProductStoreRepo;
import com.cmpe275.cartpool.repos.StoreRepo;
import com.cmpe275.cartpool.services.ProductStoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
                System.out.println("Mapping already exists");
            }else {
                ProductStore productStore = new ProductStore(product, store);
                ProductStore savedProductStore = productStoreRepo.save(productStore);
                return savedProductStore;
            }
        }
        System.out.println("Product or store doesn't exist");
        return null;
    }

    @Override
    public List<ProductStore> getAllProductsInStore(int id) {
        return productStoreRepo.findAllByStoreId(id);
    }

    @Override
    public List<Store> getAllStoresForProduct(int id) {
        List<ProductStore> toProcess = productStoreRepo.findAllByProductId(id);
        List<Store> store = new ArrayList<>();
        for( ProductStore productStore : toProcess){
            store.add(productStore.getStore());
        }
        return store;
    }

    @Override
    public ProductStore findById(int id) {
        return productStoreRepo.findById(id).get();
    }

    @Override
    public List<ProductStore> getAllProductsByProduct(int product) {
        return productStoreRepo.findAllByProductId(product);
    }
}
