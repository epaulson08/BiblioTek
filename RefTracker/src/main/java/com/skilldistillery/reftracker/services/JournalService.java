package com.skilldistillery.reftracker.services;

import java.util.List;

import com.skilldistillery.reftracker.entities.Journal;

public interface JournalService {

	List<Journal> index();
	
	long count();

	Journal findById(int id);
	
	Journal create(Journal j);
	
	Journal update(int id, Journal newJ);
	
	boolean delete(int id);
	
	List<Journal> findAllOrderByName();
}
