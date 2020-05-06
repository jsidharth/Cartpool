package com.cmpe275.cartpool.repos;

import com.cmpe275.cartpool.entities.ProductStore;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductStoreRepo extends JpaRepository<ProductStore,Integer> {
    boolean existsByStoreIdAndProductId(int storeId, int productId);

    ProductStore findByStoreIdAndProductId(int storeId, int productId);

    List<ProductStore> findAllByStoreId(int store_id);

    List<ProductStore> findAllByProductId(int product_id);
}
