package com.ericpaulsondev.reftracker.controllers;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ericpaulsondev.reftracker.entities.MyCollection;
import com.ericpaulsondev.reftracker.entities.User;
import com.ericpaulsondev.reftracker.services.AuthService;
import com.ericpaulsondev.reftracker.services.CitationStyleService;
import com.ericpaulsondev.reftracker.services.JournalArticleService;
import com.ericpaulsondev.reftracker.services.MyCollectionService;
import com.ericpaulsondev.reftracker.services.UserService;

/**
 * FIXME: This is here to facilitate testing but will need to be removed if
 * using in a production environment.
 *
 */

@CrossOrigin({ "*", "http://localhost:4200" })
@RestController
public class UtilityCreateTestData {

	@Autowired
	AuthService authServ;

	@Autowired
	JournalArticleService jaServ;

	@Autowired
	UserService userServ;

	@Autowired
	CitationStyleService csServ;

	@Autowired
	MyCollectionService collServ;

	@PostMapping("create-test-user")
	public String createTestUser(HttpServletResponse resp) {
		try {
			User testUser = userServ.show(2);
			if (testUser == null) {
				testUser = new User();
			}

			testUser.setId(2);
			testUser.setUsername("demo");
			testUser.setPassword("demo");
			testUser.setRole("user");

			// add first 10 JournalArticles in DB to this user
			for (int i = 1; i <= 10; i++) {
				testUser.addJA(jaServ.findById(i));
			}

			// add citation styles
			for (int i = 1; i <= 6; i++) {
				testUser.addCS(csServ.findById(i));
			}

			
			
			// persist test user
			authServ.register(testUser);

			// add MyCollections
			MyCollection testColl1 = collServ.findById(2);
			MyCollection testColl2 = collServ.findById(3);
			MyCollection testColl3 = collServ.findById(4);
			
			if (testColl1 == null) {
				testColl1 = new MyCollection("Rapid response teams",
						"Paper for research class, spring 2021");
				testColl1.addJournalArticle(jaServ.findById(1));
				testColl1.addJournalArticle(jaServ.findById(2));
				collServ.create(2, testColl1);				
			}

			if (testColl2 == null) {
				testColl2 = new MyCollection("CCJM",
						"Cleveland Clinic Journal of Medicine review article collection");
				testColl2.addJournalArticle(jaServ.findById(7));
				testColl2.addJournalArticle(jaServ.findById(8));
				testColl2.addJournalArticle(jaServ.findById(9));
				collServ.create(2, testColl2);  
			}

			if (testColl3 == null) {
				testColl3 = new MyCollection("Medical Computing", "Practical applications of computing in healthcare delivery");
				testColl3.addJournalArticle(jaServ.findById(10));
				collServ.create(2, testColl3);
			}

			resp.setStatus(201);
			return "Test user created/updated: \nusername = demo, password = demo";
		}

		catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(400);
			return "Test user not created. An error occurred";
		}

	}

	@PostMapping("create-test-admin")
	public String createTestAdmin(HttpServletResponse resp) {
		try {
			User testAdmin = userServ.show(3);
			if (testAdmin == null) {
				testAdmin = new User();
			}

			testAdmin.setId(3);
			testAdmin.setUsername("admin");
			testAdmin.setPassword("wombat1");
			testAdmin.setRole("admin");

			// add JournalArticles to this user
			testAdmin.addJA(jaServ.findById(8));
			testAdmin.addJA(jaServ.findById(9));
			testAdmin.addJA(jaServ.findById(10));

			authServ.register(testAdmin);

			// add a MyCollection
			MyCollection coll = new MyCollection("Test mycollection for testuser",
					"great collection! Should have JA's 8, 9, 10");
			coll.addJournalArticle(jaServ.findById(8));
			coll.addJournalArticle(jaServ.findById(9));
			coll.addJournalArticle(jaServ.findById(10));
			collServ.create(3, coll);

			// add AMA and APA citation styles
			testAdmin.addCS(csServ.findById(1));
			testAdmin.addCS(csServ.findById(2));

			resp.setStatus(201);
			return "Test admin created: \nusername = admin, password = wombat1";
		}

		catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(400);
			return "Test admin not created. An error occurred";
		}

	}

}