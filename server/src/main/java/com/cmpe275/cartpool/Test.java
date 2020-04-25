package com.cmpe275.cartpool;

import com.cmpe275.cartpool.entities.Product;
import com.cmpe275.cartpool.repos.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Test {

    @Autowired
    ProductRepo productRepo;

@GetMapping("/product")
    public void test(){
    Product p = new Product();

}

}
