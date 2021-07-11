package com.ericpaulsondev.reftracker.services;

import java.util.List;

import com.ericpaulsondev.reftracker.entities.CitationStyle;
import com.ericpaulsondev.reftracker.entities.CitationStyleLink;

public interface CitationStyleLinkService {

	List<CitationStyleLink> findByCitationStyleId(Integer citationStyleId);
	
}
