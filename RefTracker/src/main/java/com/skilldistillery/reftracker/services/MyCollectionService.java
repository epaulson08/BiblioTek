package com.skilldistillery.reftracker.services;

import java.security.Principal;
import java.util.List;

import com.skilldistillery.reftracker.entities.MyCollection;

public interface MyCollectionService {

	List<MyCollection> findByUserUsername(String username);
	
	MyCollection findById(Integer id);	

	MyCollection create(Integer userId, MyCollection myCollection);
}
