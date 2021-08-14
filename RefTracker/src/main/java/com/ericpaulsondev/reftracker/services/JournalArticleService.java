package com.ericpaulsondev.reftracker.services;

import java.util.List;

import com.ericpaulsondev.reftracker.entities.JournalArticle;
import com.ericpaulsondev.reftracker.util.UtilPayload;

public interface JournalArticleService {

	List<JournalArticle> index();
	
	long count();
	
	long countByUsername(String username);

	JournalArticle findById(int id);
	
	JournalArticle create(UtilPayload payload, String username);
	
	JournalArticle update(int id, JournalArticle newJa);
	
	boolean delete(int id);
	
	JournalArticle addAuthor(int jaId, int authorId);

	List<JournalArticle> search(String searchTerm);
	
	List<JournalArticle> findByJournalId(int journalId);

	List<JournalArticle> findByJournalIdAndUsersUsername(int journalId, String username);
	
	List<JournalArticle> findByUser(String username);
}
