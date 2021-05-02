package com.skilldistillery.reftracker.services;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.reftracker.entities.Author;
import com.skilldistillery.reftracker.repositories.AuthorRepository;

@Service
@Transactional
public class AuthorServiceImpl implements AuthorService {

	@Autowired
	private AuthorRepository aRepo;

	@Override
	public Author findById(int id) {
		Author author = null;
		Optional<Author> opt = aRepo.findById(id);
		if (opt.isPresent())
			author = opt.get();
		return author;
	}

	@Override
	public Author findByFirstNameAndMiddleNameAndLastNameAndSuffix(String firstName, String middleName, String lastName,
			String suffix) {
		return aRepo.findByFirstNameAndMiddleNameAndLastNameAndSuffix(firstName, middleName, lastName, suffix);
	}

	@Override
	public Author create(Author a) {
		if (!aRepo.existsByFirstNameAndMiddleNameAndLastNameAndSuffix(a.getFirstName(), a.getMiddleName(),
				a.getLastName(), a.getSuffix())) {
			a = aRepo.saveAndFlush(a);
		} else {
			a = aRepo.findByFirstNameAndMiddleNameAndLastNameAndSuffix(a.getFirstName(), a.getMiddleName(),
					a.getLastName(), a.getSuffix());
		}
		return a;
	}

}
