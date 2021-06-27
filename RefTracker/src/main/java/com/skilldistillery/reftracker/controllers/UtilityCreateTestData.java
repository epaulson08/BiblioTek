package com.skilldistillery.reftracker.controllers;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.reftracker.entities.User;
import com.skilldistillery.reftracker.services.AuthService;
import com.skilldistillery.reftracker.services.CitationStyleService;
import com.skilldistillery.reftracker.services.JournalArticleService;
import com.skilldistillery.reftracker.services.UserService;

/**
 * 
 * This is here to facilitate testing but will need to be removed
 * if using in a production environment.
 * 
 * However, the test user here created has a role of "user", so will
 * not have any privileges that would not be granted by registering
 * through the front end.
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
	
	@PostMapping("create-test-user")
	public String createTestUser(HttpServletResponse resp) {
		try {

			User testUser = userServ.showByUserName("tester");
			
			if (testUser == null) {
				testUser = new User();
				testUser.setUsername("tester");
				testUser.setPassword("wombat1");
				testUser.setRole("user");
				
				// add first 10 JournalArticles in DB to this user
				for (int i = 1; i <= 10; i++) {
				testUser.addJA(jaServ.findById(i));
				}
				
				// add AMA and APA citation styles
				testUser.addCS(csServ.findById(1));
				testUser.addCS(csServ.findById(2));
				
				authServ.register(testUser);
				
				resp.setStatus(201);
				return "Test user created: \nusername = tester, password = wombat1";
			}

			else {
				resp.setStatus(405);
				return "Test user not created: User 'tester' already exists";
			}
		}

		catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(400);
			return "Test user not created";
		}

	}

}
