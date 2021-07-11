package com.ericpaulsondev.reftracker.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ericpaulsondev.reftracker.entities.CitationStyle;

public interface CitationStyleRepository extends JpaRepository<CitationStyle, Integer> {

	List<CitationStyle> findByUsersUsername(String username);
	
}
