package com.codetest.CRUD_Spring.repository;

import com.codetest.CRUD_Spring.model.XmasWish;
import org.springframework.data.mongodb.repository.MongoRepository;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface XmasWishRepository extends MongoRepository<XmasWish, Integer> {

}