package com.skilldistillery.reftracker.services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.reftracker.entities.Journal;
import com.skilldistillery.reftracker.repositories.JournalRepository;

@Service
@Transactional
public class JournalServiceImpl implements JournalService {

	@Autowired
	private JournalRepository jRepo;

	@Override
	public List<Journal> index() {
		return jRepo.findAll();
	}
	
	@Override
	public List<Journal> findAllOrderByName() {
		return jRepo.findByOrderByName();
	}

	@Override
	public long count() {
		return 0;
	}

	@Override
	public Journal findById(int id) {
		return null;
	}

	@Override
	public Journal create(Journal j) {
		return null;
	}

	@Override
	public Journal update(int id, Journal newJ) {
		return null;
	}

	@Override
	public boolean delete(int id) {
		return false;
	}

}
