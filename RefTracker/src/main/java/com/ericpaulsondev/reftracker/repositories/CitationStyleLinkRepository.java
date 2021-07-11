package com.ericpaulsondev.reftracker.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ericpaulsondev.reftracker.entities.CitationStyle;
import com.ericpaulsondev.reftracker.entities.CitationStyleLink;

public interface CitationStyleLinkRepository extends JpaRepository<CitationStyleLink, Integer>{

	List<CitationStyleLink> findByCitationStyleId(Integer citationStyleId);
	
}
