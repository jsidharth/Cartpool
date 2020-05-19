package com.cmpe275.cartpool.controller;

import com.cmpe275.cartpool.entities.Product;
import com.cmpe275.cartpool.entities.ProductStore;
import com.cmpe275.cartpool.entities.Store;
import com.cmpe275.cartpool.entities.User;
import com.cmpe275.cartpool.services.ProductService;
import com.cmpe275.cartpool.services.ProductStoreService;
import com.cmpe275.cartpool.services.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000", "http://10.0.0.155:3000"})
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
    public Product getProductById(User user, @PathVariable(required = true) Integer productId){
        return productService.getProductById(productId);
    }

    /**
     * To get all products
     * @return
     */
    @GetMapping("/products")
    public List<Product> allProducts(User user){
        return productService.getAllProducts();
    }

    /**
     * To add new product
     * @param product
     * @return
     */
    @PostMapping("/products")
    public Product addProduct(User user, @RequestBody Product product){
        return productService.addProduct(product);
    }

    /**
     * To delete a product
     * @param productId
     */
    @DeleteMapping("/products/{productId}")
    public ResponseEntity deleteProduct(User user, @PathVariable(required = true) Integer productId){
         if(productService.deleteProduct(productId) == 0){
             return new ResponseEntity(HttpStatus.OK);
         }else{
             return new ResponseEntity(HttpStatus.NOT_FOUND);
         }
    }


    @PutMapping("/products")
    public Product modifyProduct(User user, @RequestBody Product product){
        return productService.modifyProduct(product);
    }

    // Store endpoints

    /**
    * Used for adding a product
     * @param store
     * @return storeId
    * */
    @PostMapping("/store")
    public int addStore(User user, @RequestBody Store store){
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
    ResponseEntity<Store> getStoreByName(User user, @PathVariable String store){
        if(storeService.storeExistsByName(store)){
            return new ResponseEntity<>(storeService.getStoreByName(store), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/store")
    List<Store> getAllStores(User user){
        return storeService.getAllStores();
    }

    /**
     * To delete a store by name
     * @param id
     * @return storeId
     */
    @DeleteMapping("/store/{id}")
    ResponseEntity deleteStoreById(User user, @PathVariable int id){
        storeService.deleteStore(id);
        return new ResponseEntity(HttpStatus.OK);
    }

    /**
     * Update Store
     * @param store
     * @return modifiedStore
     */
    @PutMapping("/store")
    Store modifyStore(User user, @RequestBody Store store){
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
    ProductStore addProductToStore(User user, @PathVariable int store, @PathVariable int product){
        ProductStore savedProductStore = productStoreService.addProductToStore(store,product);
        return  savedProductStore;
    }

    /**
     * Get all the product store mappings
     * @return AllProductStoreMapping
     */

    @GetMapping("/productstore")
    List<ProductStore> getAllProductStore(User user){
        return productStoreService.getAllProductStore();
    }

    @DeleteMapping("/productstore/{store}/{product}")
    int deleteProductStoreMapping(User user, @PathVariable int store, @PathVariable int product){
        return productStoreService.deleteProductFromStore(store,product);
    }


    //Multi add products to one store
    @PostMapping("productstore/multiadd")
    void addProductToMultipleStores(User user,@RequestBody HashMap<String, Object> payload){
        int product_Id  = Integer.parseInt(payload.get("product").toString());
        //System.out.println(product_Id);
        ArrayList<Integer> stores_list = (ArrayList<Integer>) payload.get("stores");
        //System.out.println(stores_list);

        for(Integer store: stores_list){
            productStoreService.addProductToStore(store, product_Id);
        }
    }


    //All products in a store
    @GetMapping("/productstore/{store_id}")
        List<ProductStore> getAllProductsInStore(User user, @PathVariable  int store_id){
        return productStoreService.getAllProductsInStore(store_id);
    }

    @GetMapping("/productstore/allstores/{product_id}")
    List<Store> getAllStoresForProduct(User user, @PathVariable int product_id){
        return productStoreService.getAllStoresForProduct(product_id);
    }

}
