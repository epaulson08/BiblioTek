package com.skilldistillery.reftracker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.reftracker.entities.Author;

public interface AuthorRepository extends JpaRepository<Author, Integer> {

	boolean existsByFirstNameAndMiddleNameAndLastNameAndSuffix(String firstName, String middleName, String lastName, String suffix);

	Author findByFirstNameAndMiddleNameAndLastNameAndSuffix(String firstName, String middleName, String lastName, String suffix);
}
