package com.cmpe275.cartpool.controller;

import com.cmpe275.cartpool.entities.Product;
import com.cmpe275.cartpool.entities.ProductStore;
import com.cmpe275.cartpool.entities.Store;
import com.cmpe275.cartpool.services.ProductService;
import com.cmpe275.cartpool.services.ProductStoreService;
import com.cmpe275.cartpool.services.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ProductAndStoreController {

    @Autowired
    ProductService productService;

    @Autowired
    StoreService storeService;

    @Autowired
    ProductStoreService productStoreService;

    //Product endpoints

    /**
     * Get product by id
     * @param productId
     * @return
     */
    @GetMapping("/products/{productId}")
    public Product getProductById(@PathVariable(required = true) Integer productId){
        return productService.getProductById(productId);
    }

    /**
     * To get all products
     * @return
     */
    @GetMapping("/products")
    public List<Product> allProducts(){
        return productService.getAllProducts();
    }

    /**
     * To add new product
     * @param product
     * @return
     */
    @PostMapping("/products")
    public Product addProduct(@RequestBody Product product){
        return productService.addProduct(product);
    }

    /**
     * To delete a product
     * @param productId
     */
    @DeleteMapping("/products/{productId}")
    public void deleteProduct(@PathVariable(required = true) Integer productId){
         productService.deleteProduct(productId);
    }


    @PutMapping("/products")
    public Product modifyProduct(@RequestBody Product product){
        return productService.modifyProduct(product);
    }

    // Store endpoints

    /**
    * Used for adding a product
     * @param store
     * @return storeId
    * */
    @PostMapping("/store")
    public int addStore(@RequestBody Store store){
        if(storeService.storeExistsByName(store.getName())){
            //Throw exception
        }else{
            return storeService.addStore(store);
        }
        //TODO: Throw exception that store already exists
        return -1;
    }

    /**
     * To find a store by name
     * @param store
     * @return storeObject
     */

    @GetMapping("/store/{store}")
    Store getStoreByName(@PathVariable String store){
        if(storeService.storeExistsByName(store)){
            return storeService.getStoreByName(store);
        }
        //TODO: Throw exception that store doesn't exist
        return new Store();
    }

    @GetMapping("/store")
    List<Store> getAllStores(){
        return storeService.getAllStores();
    }

    /**
     * To delete a store by name
     * @param id
     * @return storeId
     */
    @DeleteMapping("/store/{id}")
    void deleteStoreById(@PathVariable int id){
        storeService.deleteStore(id);
    }

    /**
     * Update Store
     * @param store
     * @return modifiedStore
     */
    @PutMapping("/store")
    Store modifyStore(@RequestBody Store store){
        return storeService.updateStore(store);
    }

    //ProductStore mappings

    /**
     * To add a product store mapping
     * @param store
     * @param product
     * @return productStoreAddress
     */
    //ProductStore endpoints
    @PostMapping("/productstore/{store}/{product}")
    ProductStore addProductToStore(@PathVariable int store, @PathVariable int product){
        ProductStore savedProductStore = productStoreService.addProductToStore(store,product);
        return  savedProductStore;
    }

    /**
     * Get all the product store mappings
     * @return AllProcutStoreMapping
     */

    @GetMapping("/productstore")
    List<ProductStore> getAllProductStore(){
        return productStoreService.getAllProductStore();
    }

    @DeleteMapping("/productstore/{store}/{product}")
    int deleteProductStoreMapping(@PathVariable int store, @PathVariable int product){
        return productStoreService.deleteProductFromStore(store,product);
    }
}
