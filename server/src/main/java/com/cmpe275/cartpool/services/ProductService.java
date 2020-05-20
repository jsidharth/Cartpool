package com.cmpe275.cartpool.services;

import com.cmpe275.cartpool.entities.Product;
import java.util.List;


public interface ProductService {

    public List<Product> getAllProducts();

    Product addProduct(Product product);

    int deleteProduct(Integer productId);

    Product getProductById(Integer productId);

    Product modifyProduct(Product product);
}
