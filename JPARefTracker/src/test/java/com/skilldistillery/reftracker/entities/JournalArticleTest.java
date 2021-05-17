package com.skilldistillery.reftracker.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class JournalArticleTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private JournalArticle ja;
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("RefTracker");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		ja = em.find(JournalArticle.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		ja = null;
		em.close();
	}

	@Test
	void test_JournalArticle_entity_mapping() {
		assertNotNull(ja);
		assertEquals("Reduction in hospital-wide mortality after implementation of a rapid response team: a long-term cohort study", ja.getTitle());
/*
mysql> select * from journal_article where id = 1;
+----+--------------------------------------------------------------------------------------------------------------+------------+----------------+------+------------+-------+
| id | title                                                                                                        | volume_num | year_published | doi  | journal_id | pages |
+----+--------------------------------------------------------------------------------------------------------------+------------+----------------+------+------------+-------+
|  1 | Reduction in hospital-wide mortality after implementation of a rapid response team: a long-term cohort study |         15 |           2011 |      |          5 | R269  |
+----+--------------------------------------------------------------------------------------------------------------+------------+----------------+------+------------+-------+
1 row in set (0.00 sec)
  
*/		
	}
	
	@Test
	void test_JournalArticle_to_Author_mapping() {
		assertNotNull(ja);
		assertTrue(ja.getAuthors().size() > 0);
	}
	
	@Test
	void test_JournalArticle_to_Journal_mapping() {
		assertNotNull(ja);
		assertEquals(5, ja.getJournal().getId());
	}

}
