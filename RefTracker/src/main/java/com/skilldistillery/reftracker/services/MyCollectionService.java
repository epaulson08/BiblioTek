package com.skilldistillery.reftracker.services;

import java.util.List;

import com.skilldistillery.reftracker.entities.MyCollection;

public interface MyCollectionService {

	List<MyCollection> index();
	
	MyCollection findById(Integer id);	

}
