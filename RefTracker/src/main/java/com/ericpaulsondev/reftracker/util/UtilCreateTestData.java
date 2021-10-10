package com.ericpaulsondev.reftracker.util;

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
public class UtilCreateTestData {

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

	@PostMapping("create-test-data")
	public String createTestData(HttpServletResponse resp) {
		String toReturn = "";
		toReturn += createTestUser();
		toReturn += "\n\n";
		toReturn += createTestAdmin();
		resp.setStatus(200);
		return toReturn;
	}

	private String createTestUser() {
		try {
			User testUser = userServ.show(2);
			if (testUser == null) {
				testUser = new User();
			}

			testUser.setId(2);
			testUser.setUsername("demo");
			testUser.setPassword("demo");
			testUser.setRole("user");
			testUser.setPalette("Z");
			
			// add JournalArticles to this user
			for (int i = 1; i <= 14; i++) {
				testUser.addJA(jaServ.findById(i));
			}

			// add citation styles
			testUser.addCS(csServ.findById(1));
			testUser.addCS(csServ.findById(2));
			testUser.addCS(csServ.findById(4));
			testUser.addCS(csServ.findById(6));

			// persist test users
			authServ.register(testUser);

			// add MyCollections
			MyCollection testColl1 = collServ.findById(2);
			MyCollection testColl2 = collServ.findById(3);
			MyCollection testColl3 = collServ.findById(4);

			if (testColl1 == null) {
				testColl1 = new MyCollection("AI in Radiology",
						"Applications of AI/machine learning to interpretation of radiologic images");
				testColl1.addJournalArticle(jaServ.findById(10));
				testColl1.addJournalArticle(jaServ.findById(11));
				testColl1.addJournalArticle(jaServ.findById(12));
				testColl1.addJournalArticle(jaServ.findById(13));
				collServ.create(2, testColl1);
			}

			if (testColl2 == null) {
				testColl2 = new MyCollection("CCJM", "Cleveland Clinic Journal of Medicine review article collection");
				testColl2.addJournalArticle(jaServ.findById(7));
				testColl2.addJournalArticle(jaServ.findById(8));
				testColl2.addJournalArticle(jaServ.findById(9));
				collServ.create(2, testColl2);
			}

			if (testColl3 == null) {
				testColl3 = new MyCollection("Rapid response teams", "Paper for research class, spring 2021");
				testColl3.addJournalArticle(jaServ.findById(1));
				testColl3.addJournalArticle(jaServ.findById(2));
				collServ.create(2, testColl3);
			}

			return "Test user credentials: \nusername = demo, password = demo";
		}

		catch (Exception e) {
			e.printStackTrace();
			return "Test user not created. An error occurred";
		}

	}

	private String createTestAdmin() {
		try {
			User testAdmin = userServ.show(3);
			if (testAdmin == null) {
				testAdmin = new User();
			}

			testAdmin.setId(3);
			testAdmin.setUsername("admin");
			testAdmin.setPassword("wombat1");

			// add JournalArticles to this user
			testAdmin.addJA(jaServ.findById(8));
			testAdmin.addJA(jaServ.findById(9));
			testAdmin.addJA(jaServ.findById(10));

			// this method call sets the role to user:
			authServ.register(testAdmin);
			// for testing purposes, change role in the database

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
			return "Test admin credentials:\nusername = admin, password = wombat1\nAPI sets role to user; change to admin in database for testing";
		}

		catch (Exception e) {
			e.printStackTrace();
			return "Test admin not created. An error occurred";
		}
	}

}
