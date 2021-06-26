package com.skilldistillery.reftracker.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.reftracker.entities.JournalArticle;

public interface JournalArticleRepository extends JpaRepository<JournalArticle, Integer> {

	long count();
	
	List<JournalArticle> findDistinctByTitleContainsOrAuthors_LastNameContainsIgnoreCase(String searchTerm1, String searchTerm2);
	
	List<JournalArticle> findByJournalId(int journalId);
	
	List<JournalArticle> findByJournalIdAndUsersUsername(int journalId, String username);
	
	List<JournalArticle> findByUsersUsername(String username);
}
