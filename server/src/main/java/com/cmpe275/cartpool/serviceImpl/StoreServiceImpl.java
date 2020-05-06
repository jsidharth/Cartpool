package com.cmpe275.cartpool.serviceImpl;

import com.cmpe275.cartpool.entities.Store;
import com.cmpe275.cartpool.repos.StoreRepo;
import com.cmpe275.cartpool.services.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StoreServiceImpl implements StoreService {

    @Autowired
    StoreRepo storeRepo;

    @Override
    public int addStore(Store store) {
        Store savedStore = storeRepo.save(store);
        return savedStore.getId();
    }

    @Override
    public void deleteStore(int Id) {
        //ToDo: Check if any pending orders are left before deleting
        if(storeRepo.existsById(Id)) {
          try{
              storeRepo.deleteById(Id);
          }catch (DataIntegrityViolationException e){
              throw new DataIntegrityViolationException("store already in use, cannot delete");
          }
        }
    }

    @Override
    public Store getStoreByName(String name) {
        if(storeRepo.existsByName(name)){
            return storeRepo.findByName(name);
        }
        return new Store();
    }

    @Override
    public List<Store> getAllStores() {
        return storeRepo.findAll();
    }

    @Override
    public boolean storeExistsByName(String name) {
        return storeRepo.existsByName(name);
    }

    @Override
    public Store updateStore(Store store) {
        if(!storeRepo.existsById(store.getId())){
            //TODO: Return error properly
            return null;
        }
        Store oldStore = storeRepo.findById(store.getId()).get();
        oldStore.setLogoUrl(store.getLogoUrl());
        oldStore.setCity(store.getCity());
        oldStore.setState(store.getState());
        oldStore.setStreet(store.getStreet());
        oldStore.setZip(store.getZip());

        Store toReturn = storeRepo.save(oldStore);
        return toReturn;
    }
}