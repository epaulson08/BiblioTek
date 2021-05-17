package com.skilldistillery.reftracker.entities;

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

public class MyCollectionTest {
	
	private static EntityManagerFactory emf;
	private EntityManager em;
	private MyCollection myCollection;
	
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
		myCollection = em.find(MyCollection.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		myCollection = null;
		em.close();
	}

	@Test
	void test_MyCollection_entity_mapping() {
		assertNotNull(myCollection);
		assertEquals("Rapid response paper", myCollection.getName());
	}

}
