package com.cmpe275.cartpool.serviceImpl;

import com.cmpe275.cartpool.entities.Product;
import com.cmpe275.cartpool.repos.ProductRepo;
import com.cmpe275.cartpool.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    ProductRepo productRepo;

    @Override
    public Product getProductById(Integer productId) {
        return productRepo.findById(productId).get();
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }

    @Override
    public Product addProduct(Product product) {
        return productRepo.save(product);
    }

    @Override
    public void deleteProduct(Integer productId) {
        Product productToDel = productRepo.findById(productId).get();
        if (productToDel != null){
            try {
                productRepo.delete(productToDel);
            }catch (DataIntegrityViolationException e){
                throw new DataIntegrityViolationException("product already in use, cannot delete");
            }
        }
    }


}
