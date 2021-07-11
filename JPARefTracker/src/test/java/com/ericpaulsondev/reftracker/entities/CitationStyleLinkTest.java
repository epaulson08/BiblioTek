package com.ericpaulsondev.reftracker.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.ericpaulsondev.reftracker.entities.CitationStyleLink;

class CitationStyleLinkTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private CitationStyleLink csl;

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
		csl = em.find(CitationStyleLink.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		csl = null;
		em.close();
	}

	@Test
	void test_CitationStyleLink_entity_mapping() {
		assertNotNull(csl);
		assertEquals(2, csl.getCitationStyle().getId());
	}

}
