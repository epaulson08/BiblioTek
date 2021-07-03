package com.skilldistillery.reftracker.controllers;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.reftracker.entities.MyCollection;
import com.skilldistillery.reftracker.entities.User;
import com.skilldistillery.reftracker.services.AuthService;
import com.skilldistillery.reftracker.services.CitationStyleService;
import com.skilldistillery.reftracker.services.JournalArticleService;
import com.skilldistillery.reftracker.services.MyCollectionService;
import com.skilldistillery.reftracker.services.UserService;

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
			testUser.setUsername("tester");
			testUser.setPassword("wombat1");
			testUser.setRole("user");

			// add first 10 JournalArticles in DB to this user
			for (int i = 1; i <= 10; i++) {
				testUser.addJA(jaServ.findById(i));
			}

			authServ.register(testUser);

			// add MyCollection
			MyCollection coll = new MyCollection("Test mycollection for testuser",
					"great collection! Should have first 3 JA's");
			coll.addJournalArticle(jaServ.findById(1));
			coll.addJournalArticle(jaServ.findById(2));
			coll.addJournalArticle(jaServ.findById(3));
			collServ.create(2, coll);

			// add AMA and APA citation styles
			testUser.addCS(csServ.findById(1));
			testUser.addCS(csServ.findById(2));


			resp.setStatus(201);
			return "Test user created/updated: \nusername = tester, password = wombat1";
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
			testAdmin.setUsername("admintest");
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
			return "Test admin created: \nusername = admintest, password = wombat1";
		}

		catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(400);
			return "Test admin not created. An error occurred";
		}

	}

}
