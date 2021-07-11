package com.ericpaulsondev.reftracker.entities;

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

import com.ericpaulsondev.reftracker.entities.Author;

public class AuthorTest {
	private static EntityManagerFactory emf;
	private EntityManager em;
	private Author author;
	
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
		author = em.find(Author.class, 4);
	}

	@AfterEach
	void tearDown() throws Exception {
		author = null;
		em.close();
	}

	@Test
	void test_Author_entity_mapping() {
		assertNotNull(author);
		assertEquals("Ryobojad", author.getLastName());
/*
mysql> select * from author where id = 4;
+----+------------+-----------+-------------+--------+
| id | first_name | last_name | middle_name | suffix |
+----+------------+-----------+-------------+--------+
|  4 | B          | Ryobojad  |             |        |
+----+------------+-----------+-------------+--------+
1 row in set (0.00 sec)

*/
	}
	
	@Test
	void test_Author_to_JournalArticle_mapping() {
		assertNotNull(author);
		assertTrue(author.getArticles().size() > 0);
	}


}
