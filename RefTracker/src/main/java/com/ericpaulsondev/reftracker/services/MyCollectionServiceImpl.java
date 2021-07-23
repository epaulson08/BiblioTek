package com.ericpaulsondev.reftracker.services;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ericpaulsondev.reftracker.entities.JournalArticle;
import com.ericpaulsondev.reftracker.entities.MyCollection;
import com.ericpaulsondev.reftracker.entities.User;
import com.ericpaulsondev.reftracker.repositories.JournalArticleRepository;
import com.ericpaulsondev.reftracker.repositories.MyCollectionRepository;

@Service
@Transactional
public class MyCollectionServiceImpl implements MyCollectionService {

	@Autowired
	private MyCollectionRepository collRepo;

	@Autowired
	private UserService userServ;

	@Autowired
	private JournalArticleRepository jaRepo;

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

	@Override
	public MyCollection addJournalArticle(Integer myCollectionId, Integer journalArticleId) {
		MyCollection managedMyColl = null;
		JournalArticle managedJa = null;

		Optional<MyCollection> collOpt = collRepo.findById(myCollectionId);
		if (collOpt.isPresent()) {
			managedMyColl = collOpt.get();

			Optional<JournalArticle> jaOpt = jaRepo.findById(journalArticleId);
			if (jaOpt.isPresent()) {
				managedJa = jaOpt.get();
				managedMyColl.addJournalArticle(managedJa);
				collRepo.saveAndFlush(managedMyColl);
			} else
				return null;

		}
		return managedMyColl;
	}

	@Override
	public MyCollection removeJournalArticle(Integer myCollectionId, Integer journalArticleId) {
		MyCollection managedMyColl = null;
		JournalArticle managedJa = null;
		
		Optional<MyCollection> collOpt = collRepo.findById(myCollectionId);
		if (collOpt.isPresent()) {
			managedMyColl = collOpt.get();
			
			Optional<JournalArticle> jaOpt = jaRepo.findById(journalArticleId);
			if (jaOpt.isPresent()) {
				managedJa = jaOpt.get();
				managedMyColl.removeJournalArticle(managedJa);
				collRepo.saveAndFlush(managedMyColl);
			} else
				return null;
			
		}
		return managedMyColl;
	}


	/*
	 * ### `PUT api/collections/{myCollectionId}/remove-article/{journalArticleId}`
	 * A user can remove a `JournalArticle` from a `MyCollection` if it belongs to
	 * them.
	 * 
	 * | HTTP Request Type | Path | User Role | Request Body | Route Parameter |
	 * Expected HTTP Response Code | Expected Response Body | | --- | --- | --- |
	 * --- | --- | --- | --- | | PUT |
	 * api/collections/{myCollectionId}/remove-article/{journalArticleId} | user |
	 * n/a | `MyCollection` ID belonging to user, and ID of `JournalArticle` to
	 * remove | 200 OK | `MyCollection` | | PUT |
	 * api/collections/{myCollectionId}/remove-article/{journalArticleId} | user |
	 * n/a | `MyCollection` ID *not* belonging to user, and ID of `JournalArticle`
	 * to remove | 403 Forbidden | `MyCollection` | | PUT |
	 * api/collections/{myCollectionId}/remove-article/{journalArticleId} | admin |
	 * n/a | any | 405 Method Not Supported | `null` |
	 * 
	 * 
	 * --- ### `DELETE api/collections/{myCollectionId}` A user can delete a
	 * `MyCollection` if it belongs to them. An admin will use a different endpoint
	 * to accomplish this.
	 * 
	 * | HTTP Request Type | Path | User Role | Request Body | Route Parameter |
	 * Expected HTTP Response Code | Expected Response Body | | --- | --- | --- |
	 * --- | --- | --- | --- | | DELETE | api/collections/{myCollectionId} | user |
	 * n/a | ID of `MyCollection` to delete, belonging to user | 204 No Content |
	 * `MyCollection` | | DELETE | api/collections/{myCollectionId} | user | n/a |
	 * ID of `MyCollection` to delete, *not* belonging to user | 403 Forbidden |
	 * `null` | | DELETE | api/collections/{myCollectionId} | admin | n/a | any |
	 * 405 Method Not Supported | `null` |
	 * 
	 * 
	 * --- ### `DELETE api/all/collections/{myCollectionId}` An admin can delete a
	 * `MyCollection` belonging to any user.
	 * 
	 * | HTTP Request Type | Path | User Role | Request Body | Route Parameter |
	 * Expected HTTP Response Code | Expected Response Body | | --- | --- | --- |
	 * --- | --- | --- | --- | | DELETE | api/all/collections/{myCollectionId} |
	 * admin | n/a | ID of `MyCollection` to delete | 204 No Content |
	 * `MyCollection` | | DELETE | api/all/collections/{myCollectionId} | user | n/a
	 * | any | 403 Forbidden | `null` |
	 * 
	 */
}
