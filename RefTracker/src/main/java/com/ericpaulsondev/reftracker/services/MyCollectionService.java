package com.ericpaulsondev.reftracker.services;

import java.security.Principal;
import java.util.List;

import com.ericpaulsondev.reftracker.entities.MyCollection;

public interface MyCollectionService {

	List<MyCollection> findByUserUsername(String username);

	List<MyCollection> findByUserId(Integer id);
	
	MyCollection findById(Integer id);	

	MyCollection create(Integer userId, MyCollection myCollection);
	
}
