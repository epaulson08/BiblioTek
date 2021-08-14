package com.ericpaulsondev.reftracker.services;

import java.util.List;

import com.ericpaulsondev.reftracker.entities.JournalArticle;
import com.ericpaulsondev.reftracker.util.UtilPayload;

public interface JournalArticleService {

	// READ
	JournalArticle findById(int id);
	List<JournalArticle> index();
	List<JournalArticle> search(String searchTerm);
	List<JournalArticle> findByJournalId(int journalId);
	List<JournalArticle> findByJournalIdAndUsersUsername(int journalId, String username);
	List<JournalArticle> findByUser(String username);
	long count();
	long countByUsername(String username);
	
	// CREATE
	JournalArticle create(JournalArticle ja, String username);
	JournalArticle addAuthor(int jaId, int authorId);
	JournalArticle removeAuthor(int jaId, int authorId);
	
	// UPDATE
	JournalArticle update(int id, JournalArticle newJa);
	
	// DELETE
	boolean delete(int id);	
}
