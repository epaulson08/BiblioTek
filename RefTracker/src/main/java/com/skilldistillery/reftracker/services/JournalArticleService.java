package com.skilldistillery.reftracker.services;

import java.util.List;

import com.skilldistillery.reftracker.controllers.PayloadUtility;
import com.skilldistillery.reftracker.entities.JournalArticle;

public interface JournalArticleService {

	List<JournalArticle> index();
	
	long count();

	JournalArticle findById(int id);
	
	JournalArticle create(PayloadUtility payload);
	
	JournalArticle update(int id, JournalArticle newJa);
	
	boolean delete(int id);
	
	JournalArticle addAuthor(int jaId, int authorId);

	List<JournalArticle> search(String searchTerm);
}
