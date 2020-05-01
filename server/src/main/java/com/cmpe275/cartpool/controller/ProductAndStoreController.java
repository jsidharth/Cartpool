package com.cmpe275.cartpool.controller;

import com.cmpe275.cartpool.entities.Product;
import com.cmpe275.cartpool.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class ProductAndStoreController {

    @Autowired
    ProductService productService;

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

    // Store endpoints



    //ProductStore endpoints

}
