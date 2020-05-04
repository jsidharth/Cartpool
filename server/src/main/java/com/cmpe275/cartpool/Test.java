package com.cmpe275.cartpool;

import com.cmpe275.cartpool.entities.*;
import com.cmpe275.cartpool.repos.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

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
    OrdersRepo ordersRepo;

    @Autowired
    UserRepo userRepo;

    @Autowired
    PoolRepo poolRepo;

    @Autowired
    PoolMemberRepo poolMemberRepo;

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

    @GetMapping("/get")
    public List<ProductStore> getProducts(){
       return productStoreRepo.findAll();
    }

    @GetMapping("/test")
    public List<PoolMember> test(){
        User u1 = new User("user1", "nickname1", "email1@gmail.com", Role.USER, true, "image1", 12345, "Street1", "city1", "state1", "zip1" );
        User u2 = new User("user2", "nickname2", "email2@gmail.com", Role.USER, true, "image2", 1235, "Street2", "city2", "state2", "zip2" );
        User u3 = new User("user3", "nickname3", "email3@gmail.com", Role.USER, true, "image3", 145, "Street3", "city3", "state3", "zip3" );
        User u4 = new User("user4", "nickname4", "email4@gmail.com", Role.USER, true, "image4", 124, "Street4", "city4", "state4", "zip4" );
        User u5 = new User("user5", "nickname5", "email5@gmail.com", Role.USER, true, "image5", 124, "Street5", "city5", "state5", "zip5" );
        u1 = userRepo.save(u1);
        u2 = userRepo.save(u2);
        u3 = userRepo.save(u3);
        u4 = userRepo.save(u4);

        //Why is pool id passed on and not generated
        //Why is pool id not primary key?
        Pool pool = new Pool("poolId","poolname1", "neigh1", "desc1", "95123");
        //pool.setPoolLeader(u1);
        Pool savedPool = poolRepo.save(pool);
        //how does poolleader get tracked in poolmembers table?
        PoolMember p1 = new PoolMember(u1, u1.getId(), true,true, savedPool);
        PoolMember p2 = new PoolMember(u2, u1.getId(), true,true, savedPool);
        PoolMember p3 = new PoolMember(u3, u1.getId(), true,true, savedPool);
        PoolMember p4 = new PoolMember(u4, u1.getId(), true,true, savedPool);
        PoolMember p5 = new PoolMember(u5, u1.getId(), true,true, savedPool);
        poolMemberRepo.save(p1);
        poolMemberRepo.save(p2);
        poolMemberRepo.save(p3);
        poolMemberRepo.save(p4);
        poolMemberRepo.save(p5);
        return poolRepo.findById("poolId").get().getPoolMembers();
    }


    @GetMapping("/test1")
    public Pool test1(){

//        Pool p = poolRepo.findById("poolId").get();
//        p.setPoolLeader(userRepo.findById(1).get());
//        poolRepo.save(p);
        return poolRepo.findById("poolId").get();
    }

}
