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
                // check here for products being there in active orders

                productRepo.delete(productToDel);
            }catch (DataIntegrityViolationException e){
                throw new DataIntegrityViolationException("product already in use, cannot delete");
            }
        }
    }

    @Override
    public Product modifyProduct(Product product) {

        if(!productRepo.existsById(product.getId())){
            //TODO: Handle error properly
            System.out.println("product doesn't exist");
            return null;
        }

        Product updatedProduct = productRepo.findById(product.getId()).get();
        updatedProduct.setName(product.getName());
        updatedProduct.setBrand(product.getBrand());
        updatedProduct.setDescription(product.getDescription());
        updatedProduct.setImgUrl(product.getImgUrl());
        updatedProduct.setPrice(product.getPrice());
        updatedProduct.setUnit(product.getUnit());
        updatedProduct.setSku(product.getSku());

        Product toSend = productRepo.save(updatedProduct);

        return toSend;
    }
}
