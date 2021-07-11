package com.ericpaulsondev.reftracker.services;

import java.util.List;

import com.ericpaulsondev.reftracker.entities.CitationStyle;

public interface CitationStyleService {

	List<CitationStyle> index();

	List<CitationStyle> findByUsersUsername(String username);

	CitationStyle findById(int id);
	
}
