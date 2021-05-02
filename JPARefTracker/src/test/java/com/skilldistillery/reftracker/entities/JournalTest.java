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

public class JournalTest {
	private static EntityManagerFactory emf;
	private EntityManager em;
	private Journal journal;

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
		journal = em.find(Journal.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		journal = null;
		em.close();
	}
	
	@Test
	void test_Journal_entity_mapping() {
		assertNotNull(journal);
		assertEquals("The Fake Journal of Medical Oddities", journal.getName());
	
	/*
	 * 
mysql> select * from journal where id = 1;
+----+--------------------------------------+----------------+
| id | name                                 | abbreviation   |
+----+--------------------------------------+----------------+
|  1 | The Fake Journal of Medical Oddities | Fake J Med Odd |
+----+--------------------------------------+----------------+
1 row in set (0.00 sec)
	 */
	}
	
	@Test
	void test_Journal_to_JournalArticle_Mapping() {
		assertNotNull(journal);
		assertTrue(journal.getArticles().size() > 0);
	}

}
