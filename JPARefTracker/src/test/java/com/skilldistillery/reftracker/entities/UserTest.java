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

public class UserTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private User user;

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
		user = em.find(User.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		user = null;
		em.close();
	}
	
	/*
	 * mysql> SELECT * FROM user;
+----+----------+----------+-----------------+------------+-----------+-------------+------+-----------+---------+-------------+-------------+
| id | username | password | email           | first_name | last_name | middle_name | role | localdate | enabled | create_date | update_date |
+----+----------+----------+-----------------+------------+-----------+-------------+------+-----------+---------+-------------+-------------+
|  1 | testuser | wombat1  | tester@test.com | Testy      | Tester    | NULL        | NULL | NULL      |    NULL | NULL        | NULL        |
+----+----------+----------+-----------------+------------+-----------+-------------+------+-----------+---------+-------------+-------------+
1 row in set (0.00 sec)
	 */

	@Test
	void test_User_entity_mappings() {
		assertNotNull(user);
		assertEquals("testuser", user.getUsername());
	}
	
	@Test
	void test_User_to_MyCollection_mapping() {
		assertNotNull(user);
		assertTrue(user.getMyCollections().size() > 0);
		/*
mysql> select * from my_collection where user_id = 1;
+----+----------------------+------------------------------------------------------------+---------+
| id | name                 | description                                                | user_id |
+----+----------------------+------------------------------------------------------------+---------+
|  1 | Rapid response paper | Articles for rapid response team review project, fall 2020 |       1 |
+----+----------------------+------------------------------------------------------------+---------+
1 row in set (0.01 sec)
		 */
	}
	
}
