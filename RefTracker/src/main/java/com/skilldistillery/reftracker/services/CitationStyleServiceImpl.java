package com.skilldistillery.reftracker.services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.reftracker.entities.CitationStyle;
import com.skilldistillery.reftracker.repositories.CitationStyleRepository;

@Service
@Transactional
public class CitationStyleServiceImpl implements CitationStyleService {

	@Autowired
	private CitationStyleRepository csRepo;
	
	@Override
	public List<CitationStyle> index() {
		return csRepo.findAll();
	}

	@Override
	public List<CitationStyle> findByUsersUsername(String username) {
		return csRepo.findByUsersUsername(username);
	}

}
