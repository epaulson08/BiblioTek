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
		assertEquals("A Review of Earwax Removal", ja.getTitle());
	}
	
	@Test
	void test_JournalArticle_to_Author_mapping() {
		assertNotNull(ja);
		assertTrue(ja.getAuthors().size() > 0);
	}
	
	@Test
	void test_JournalArticle_to_Journal_mapping() {
		assertNotNull(ja);
		assertEquals(1, ja.getJournal().getId	());
		assertEquals("The Fake Journal of Medical Oddities", ja.getJournal().getName());
	}

}
