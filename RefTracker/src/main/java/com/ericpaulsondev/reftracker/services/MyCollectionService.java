package com.ericpaulsondev.reftracker.services;

import java.util.List;

import com.ericpaulsondev.reftracker.entities.MyCollection;

public interface MyCollectionService {

	List<MyCollection> findByUserUsername(String username);

	List<MyCollection> findByUserId(Integer id);

	MyCollection findById(Integer id);

	MyCollection create(Integer userId, MyCollection myCollection);

	MyCollection update(Integer myCollectionId, MyCollection myCollection);

	MyCollection addJournalArticle(Integer myCollectionId, Integer journalArticleId);

	MyCollection removeJournalArticle(Integer myCollectionId, Integer journalArticleId);

	boolean delete(Integer myCollectionId);

}
