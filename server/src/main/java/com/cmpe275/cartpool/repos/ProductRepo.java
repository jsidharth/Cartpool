package com.cmpe275.cartpool.repos;

import com.cmpe275.cartpool.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepo extends JpaRepository<Product,Integer> {
}
