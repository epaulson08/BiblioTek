package com.skilldistillery.reftracker.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.reftracker.entities.Journal;

public interface JournalRepository extends JpaRepository<Journal, Integer> {

	long count();
	
	List<Journal> findByOrderByName();

}
