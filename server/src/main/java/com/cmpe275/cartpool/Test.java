package com.cmpe275.cartpool;

import com.cmpe275.cartpool.entities.*;
import com.cmpe275.cartpool.repos.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

@RestController
public class Test {

    @Autowired
    ProductRepo productRepo;

    @Autowired
    StoreRepo storeRepo;

    @Autowired
    ProductStoreRepo productStoreRepo;

    @Autowired
    UserRepo userRepo;

    @Autowired
    PoolRepo poolRepo;

    @Autowired
    PoolMemberRepo poolMemberRepo;

    @Autowired
    OrdersRepo ordersRepo;

/*
    @GetMapping("/test_product_store")
    public List<ProductStore> testProduct() {
        Product p = new Product("Product 2", "This is a test product", "", "xyz", "bottle", 20);
        Product savedPrduct = productRepo.save(p);
        Store s = new Store("store 2","","street1","city1","state1","12345");
        Store savedStore = storeRepo.save(s);
        ProductStore ps = new ProductStore(savedPrduct.getId(),savedStore.getId());
        productStoreRepo.save(ps);
        return productStoreRepo.findAll();
    }
*/
/*
    @GetMapping("/get")
    public List<ProductStore> getProducts(){
       return productStoreRepo.findAll();
    }

    @GetMapping("/test_order")
    public Orders test(){
        User user = new User("Sushant", "sushi", "lalal@lalal.com", Role.USER, true, null,
                500, "Street1", "city1" ,"state1", "zip1");

        User poolLeader = new User("Sushant1", "sushi1", "lalal@lal1al.com", Role.USER, true, null,
                5000, "Street1", "city1" ,"state1", "zip1");

        User saved_poolLeader = userRepo.save(poolLeader);
        User saved_user = userRepo.save(user);

        Product p = new Product("Product 2", "This is a test product", "", "xyz", "bottle", 20);
        Product savedProduct = productRepo.save(p);

        Store s = new Store("store 2","","street1","city1","state1","12345");
        Store savedStore = storeRepo.save(s);

        ProductStore ps = new ProductStore(savedProduct.getId(),savedStore.getId());

        ProductStore savedProductStore = productStoreRepo.save(ps);

        Pool pool = new Pool(saved_poolLeader,"some_id", "pool1", "san jose", "description", "34234");

        Pool savedPool = poolRepo.save(pool);

        PoolMember pool_user = new PoolMember(savedPool, saved_user, saved_poolLeader.getId(), true, true);

        PoolMember pool_poolLeader = new PoolMember(savedPool, saved_poolLeader, saved_poolLeader.getId(), true, true);

        poolMemberRepo.save(pool_poolLeader);
        poolMemberRepo.save(pool_user);

        Orders orders = new Orders(savedStore, user, savedPool, Status.ORDER_PLACED, poolLeader,
                (float)533.144,new Date(),new Date());

        Orders saved_order = ordersRepo.save(orders);

        return saved_order;

    }
*/
}
