package com.skilldistillery.reftracker.services;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.reftracker.entities.MyCollection;
import com.skilldistillery.reftracker.repositories.MyCollectionRepository;

@Service
@Transactional
public class MyCollectionServiceImpl implements MyCollectionService {

	@Autowired
	private MyCollectionRepository collRepo;

	@Override
	public MyCollection findById(Integer id) {
		MyCollection coll = null;
		Optional<MyCollection> opt = collRepo.findById(id);
		if (opt.isPresent())
			coll = opt.get();
		return coll;
	}

}
