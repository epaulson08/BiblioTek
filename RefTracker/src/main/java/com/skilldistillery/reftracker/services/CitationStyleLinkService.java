package com.skilldistillery.reftracker.services;

import java.util.List;

import com.skilldistillery.reftracker.entities.CitationStyle;
import com.skilldistillery.reftracker.entities.CitationStyleLink;

public interface CitationStyleLinkService {

	List<CitationStyleLink> findByCitationStyleId(Integer citationStyleId);
	
}
