package com.skilldistillery.reftracker.services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.reftracker.entities.CitationStyle;
import com.skilldistillery.reftracker.entities.CitationStyleLink;
import com.skilldistillery.reftracker.repositories.CitationStyleLinkRepository;

@Service
@Transactional
public class CitationStyleLinkServiceImpl implements CitationStyleLinkService {

	@Autowired
	CitationStyleLinkRepository cslRepo;
	
	@Override
	public List<CitationStyleLink> findByCitationStyleId(Integer citationStyleId) {
		return cslRepo.findByCitationStyleId(citationStyleId);
	}

}
