package com.skilldistillery.reftracker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.reftracker.entities.MyCollection;

public interface MyCollectionRepository extends JpaRepository<MyCollection, Integer> {
	
}
