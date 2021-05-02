package com.skilldistillery.reftracker.services;

import com.skilldistillery.reftracker.entities.Author;

public interface AuthorService {

//	List<Author> index();
	
	Author findById(int id);
	
	Author create(Author a);
	
//	Author update(int id, Author newAuthor);
	
//	boolean delete(int id);
	
	Author findByFirstNameAndMiddleNameAndLastNameAndSuffix(String firstName, String middleName, String lastName, String suffix);
	
}
