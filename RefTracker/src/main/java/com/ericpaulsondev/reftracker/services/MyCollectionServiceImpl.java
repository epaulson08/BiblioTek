package com.ericpaulsondev.reftracker.services;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ericpaulsondev.reftracker.entities.JournalArticle;
import com.ericpaulsondev.reftracker.entities.MyCollection;
import com.ericpaulsondev.reftracker.entities.User;
import com.ericpaulsondev.reftracker.repositories.MyCollectionRepository;

@Service
@Transactional
public class MyCollectionServiceImpl implements MyCollectionService {

	@Autowired
	private MyCollectionRepository collRepo;

	@Autowired
	private UserService userServ;

	@Override
	public MyCollection findById(Integer id) {
		MyCollection coll = null;
		Optional<MyCollection> opt = collRepo.findById(id);
		if (opt.isPresent())
			coll = opt.get();
		return coll;
	}

	@Override
	public List<MyCollection> findByUserUsername(String username) {
		return collRepo.findByUserUsername(username);
	}

	@Override
	public MyCollection create(Integer userId, MyCollection coll) {
		coll.setUser(userServ.show(userId));
		coll = collRepo.saveAndFlush(coll);
		return coll;
	}

	@Override
	public List<MyCollection> findByUserId(Integer id) {
		List<MyCollection> toReturn = collRepo.findByUserId(id);
		if (toReturn.size() > 0) {
			return toReturn;
		} else
			return null;
	}

	@Override
	public MyCollection update(Integer myCollectionId, MyCollection myCollection) {
		MyCollection managedMyColl = null;
		Optional<MyCollection> opt = collRepo.findById(myCollectionId);
		if (opt.isPresent()) {
			managedMyColl = opt.get();

			List<JournalArticle> jas = myCollection.getArticles();
			String desc = myCollection.getDescription();
			String name = myCollection.getName();
			User user = myCollection.getUser();

			if (jas != null)
				managedMyColl.setArticles(jas);
			if (desc != null && !desc.equals(""))
				managedMyColl.setDescription(desc);
			if (name != null && !name.equals(""))
				managedMyColl.setName(name);
			return collRepo.saveAndFlush(managedMyColl);
		} else
			return null;
	}
}
