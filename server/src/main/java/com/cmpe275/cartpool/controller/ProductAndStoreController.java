package com.cmpe275.cartpool.controller;

import com.cmpe275.cartpool.entities.*;
import com.cmpe275.cartpool.services.OrderProductStoreService;
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

@RestController
public class ProductAndStoreController {

    @Autowired
    ProductService productService;

    @Autowired
    StoreService storeService;

    @Autowired
    ProductStoreService productStoreService;

    @Autowired
    OrderProductStoreService orderProductStoreService;

    //Product endpoints

    /**
     * Get product by id
     * @param productId
     * @return
     */
    @GetMapping("/products/{productId}")
    public ResponseEntity getProductById(User user, @PathVariable(required = true) Integer productId){
        return ResponseEntity.ok(productService.getProductById(productId));
    }

    /**
     * To get all products
     * @return
     */
    @GetMapping("/products")
    public ResponseEntity allProducts(User user){

        return ResponseEntity.ok(productService.getAllProducts());
    }

    /**
     * To add new product
     * @param product
     * @return
     */
    @PostMapping("/products")
    public ResponseEntity addProduct(User user, @RequestBody Product product){
        return ResponseEntity.ok(productService.addProduct(product));
    }

    /**
     * To delete a product
     * @param productId
     */
    @DeleteMapping("/products/{productId}")
    public ResponseEntity deleteProduct(User user, @PathVariable(required = true) Integer productId){
        //checking if this product is there in an active order
         List<ProductStore> productStores = productStoreService.getAllProductsByProduct(productId);
         //for these check if there are active orders
        List<OrderProductStore> activeOrders = orderProductStoreService.findOrderProductStoreByProductStoresAndActive(productStores);
        if (activeOrders.size() > 0) {
            return new ResponseEntity<>("Cannot delete. Product has active orders", HttpStatus.BAD_REQUEST);
        }
         productService.deleteProduct(productId);
         return new ResponseEntity(HttpStatus.OK);
    }


    @PutMapping("/products")
    public ResponseEntity modifyProduct(User user, @RequestBody Product product){
        return ResponseEntity.ok(productService.modifyProduct(product));
    }

    // Store endpoints

    /**
    * Used for adding a product
     * @param store
     * @return storeId
    * */
    @PostMapping("/store")
    public ResponseEntity addStore(User user, @RequestBody Store store){
        if(storeService.storeExistsByName(store.getName())){
            //Throw exception
            return new ResponseEntity<>("Store already exists", HttpStatus.BAD_REQUEST);
        }else{
            return ResponseEntity.ok(storeService.addStore(store));
        }
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
        if (storeService.checkStore(id)) {
            return new ResponseEntity<>("This store has active orders", HttpStatus.BAD_REQUEST);
        } else {
            storeService.deleteStore(id);
            return new ResponseEntity(HttpStatus.OK);
        }
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
