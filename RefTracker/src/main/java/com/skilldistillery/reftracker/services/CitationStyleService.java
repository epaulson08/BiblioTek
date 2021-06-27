package com.skilldistillery.reftracker.services;

import java.util.List;

import com.skilldistillery.reftracker.entities.CitationStyle;

public interface CitationStyleService {

	List<CitationStyle> index();

	List<CitationStyle> findByUsersUsername(String username);

}
