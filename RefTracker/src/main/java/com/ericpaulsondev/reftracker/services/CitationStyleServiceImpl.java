package com.ericpaulsondev.reftracker.services;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ericpaulsondev.reftracker.entities.CitationStyle;
import com.ericpaulsondev.reftracker.repositories.CitationStyleRepository;

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

	@Override
	public CitationStyle findById(int id) {
		Optional<CitationStyle> opt = csRepo.findById(id);
		if (opt.isPresent())
			return opt.get();
		return null;
	}

}
