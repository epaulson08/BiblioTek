package com.ericpaulsondev.reftracker.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.ericpaulsondev.reftracker.entities.JournalArticle;
import com.ericpaulsondev.reftracker.entities.MyCollection;
import com.ericpaulsondev.reftracker.entities.User;
import com.ericpaulsondev.reftracker.services.MyCollectionService;
import com.ericpaulsondev.reftracker.services.UserService;

@CrossOrigin({ "*", "http://localhost:4200" })
@RestController
public class MyCollectionController {

	@Autowired
	private MyCollectionService collServ;

	@Autowired
	private UserService userServ;

	@GetMapping("api/collections")
	public List<MyCollection> findByUserUsername(Principal principal, HttpServletResponse resp) {
		if (isAdmin(principal)) {
			resp.setStatus(405);
			return null;
		}
		else {
			List<MyCollection> myColls = collServ.findByUserUsername(principal.getName());
			if (myColls != null) {
				resp.setStatus(200);
				return myColls;
			} else {
				resp.setStatus(404);
				return null;
			}			
		}
	}

	@GetMapping("api/all/collections/{id}")
	public MyCollection findById(@PathVariable Integer id, HttpServletResponse resp, Principal principal) {
		MyCollection coll = collServ.findById(id);
		if (coll == null) {
			resp.setStatus(404);
			return null;
		} else {
			if (coll.getUser().getUsername().equals(principal.getName())) {
				resp.setStatus(200);
				return coll;
			}
			resp.setStatus(403);
			return null;
		}
	}

	@GetMapping("api/collections/users/{userId}")
	public List<MyCollection> findByUserId(@PathVariable Integer userId, HttpServletResponse resp,
			Principal principal) {
		if (!principal.getName().equals(userServ.show(userId).getUsername())) {
			resp.setStatus(403);
			return null;
		}
		List<MyCollection> toReturn = collServ.findByUserId(userId);
		if (toReturn != null) {
			resp.setStatus(200);
		}
		if (toReturn == null) {
			resp.setStatus(404);
		}
		return toReturn;
	}

	// Utility methods for authentication checks
	private boolean isAdmin(Principal principal) {
		try {
			boolean isAdmin = userServ.showByUserName(principal.getName()).getRole().equals("admin");
			System.err.println("isAdmin = " + isAdmin);
			System.err.println("principal name = " + principal.getName());
			System.err.println("principal role = " + userServ.showByUserName(principal.getName()).getRole());
			return isAdmin;
		} catch (NullPointerException npe) {
			npe.printStackTrace();
			return false;
		}
	}

	private boolean belongsToUser(int myCollId, Principal principal) {
		try {
			User user = userServ.showByUserName(principal.getName());
			MyCollection managedMyColl = collServ.findById(myCollId);
			if (managedMyColl.getUser().equals(user))
				return true;
			return false;
		} catch (NullPointerException npe) {
			npe.printStackTrace();
			return false;
		}
	}
}