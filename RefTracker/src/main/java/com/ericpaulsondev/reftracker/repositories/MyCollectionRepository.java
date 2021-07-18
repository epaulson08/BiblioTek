package com.ericpaulsondev.reftracker.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ericpaulsondev.reftracker.entities.MyCollection;

public interface MyCollectionRepository extends JpaRepository<MyCollection, Integer> {
	
	List<MyCollection> findByUserUsername(String username);
	
	List<MyCollection> findByUserId(Integer id);
}
