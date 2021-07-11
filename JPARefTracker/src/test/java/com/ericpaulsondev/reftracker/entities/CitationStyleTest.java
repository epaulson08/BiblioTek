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

import com.ericpaulsondev.reftracker.entities.CitationStyle;

class CitationStyleTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private CitationStyle cs;

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
		cs = em.find(CitationStyle.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		cs = null;
		em.close();
	}

	@Test
	void test_CitationStyle_entity_mapping() {
		assertNotNull(cs);
		assertEquals("American Psychological Association", cs.getName());
	}
	
	@Test
	void test_CitationStyle_to_CitationStyleLink_mapping() {
		assertNotNull(cs);
		assertTrue(cs.getLinks().size() > 0);
	}
	
	@Test
	void test_CitationStyle_to_User_mapping() {
		assertNotNull(cs);
		assertTrue(cs.getUsers().size() > 0);
	}
}
