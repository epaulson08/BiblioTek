package com.skilldistillery.reftracker.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.reftracker.entities.CitationStyle;
import com.skilldistillery.reftracker.entities.CitationStyleLink;

public interface CitationStyleLinkRepository extends JpaRepository<CitationStyleLink, Integer>{

	List<CitationStyleLink> findByCitationStyleId(Integer citationStyleId);
	
}
