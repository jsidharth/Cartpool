package com.cmpe275.cartpool;

import com.cmpe275.cartpool.entities.Product;
import com.cmpe275.cartpool.entities.ProductStore;
import com.cmpe275.cartpool.entities.Store;
import com.cmpe275.cartpool.repos.ProductRepo;
import com.cmpe275.cartpool.repos.ProductStoreRepo;
import com.cmpe275.cartpool.repos.StoreRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class Test {

    @Autowired
    ProductRepo productRepo;

    @Autowired
    StoreRepo storeRepo;

    @Autowired
    ProductStoreRepo productStoreRepo;

    @GetMapping("/test_product_store")
    public List<ProductStore> testProduct() {
        Product p = new Product("Product 2", "This is a test product", "", "xyz", "bottle", 20);
        Product savedPrduct = productRepo.save(p);
        Store s = new Store("store 2","","street1","city1","state1","12345");
        Store savedStore = storeRepo.save(s);
        ProductStore ps = new ProductStore(savedPrduct.getId(),savedStore.getId());
        productStoreRepo.save(ps);
        return productStoreRepo.findAll();
    }



    @GetMapping("/insert")
    public void storeProduct(){

        //return productStoreRepo.findAll();
    }

    @GetMapping("/get")
    public List<ProductStore> getProducts(){
       return productStoreRepo.findAll();
    }

}
