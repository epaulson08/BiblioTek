package com.ericpaulsondev.reftracker.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
		// admin: method not supported
		if (isAdmin(principal)) {
			resp.setStatus(405);
			return null;
		}
		// user
		else {
			List<MyCollection> myColls = collServ.findByUserUsername(principal.getName());
			// article belongs to user
			if (myColls != null) {
				resp.setStatus(200);
				return myColls;
			}
			// article does not belong to user
			else {
				resp.setStatus(404);
				return null;
			}
		}
	}

	@GetMapping("api/all/collections/{id}")
	public MyCollection findById(@PathVariable Integer id, HttpServletResponse resp, Principal principal) {
		// admin
		if (isAdmin(principal)) {
			MyCollection coll = collServ.findById(id);
			// no such MyCollection
			if (coll == null) {
				resp.setStatus(404);
				return null;
			}
			// MyCollection exists
			else {
				resp.setStatus(200);
				return coll;
			}
		}
		// user: access denied
		else {
			resp.setStatus(403);
			return null;
		}
	}

	@GetMapping("api/all/collections/users/{userId}")
	public List<MyCollection> findByUserId(@PathVariable Integer userId, HttpServletResponse resp,
			Principal principal) {
		// admin
		if (isAdmin(principal)) {
			List<MyCollection> toReturn = collServ.findByUserId(userId);
			// requested user has MyCollections
			if (toReturn != null) {
				resp.setStatus(200);
			}
			// requested user has no MyCollections
			else {
				resp.setStatus(404);
			}
			return toReturn;
		}
		// user: access denied
		else {
			resp.setStatus(403);
			return null;
		}
	}

	@PostMapping("api/collections")
	public MyCollection create(@RequestBody MyCollection myColl, HttpServletResponse resp, Principal principal) {
		// admin: method not supported
		if (isAdmin(principal)) {
			resp.setStatus(405);
			return null;
		}
		// user
		else {
			try {
				Integer userId = userServ.showByUserName(principal.getName()).getId();
				myColl = collServ.create(userId, myColl);
				resp.setStatus(201);
				return myColl;
			} catch (NullPointerException npe) {
				npe.printStackTrace();
				resp.setStatus(400);
				return null;
			}
		}
	}

	// Utility methods for authentication checks
	private boolean isAdmin(Principal principal) {
		try {
			boolean isAdmin = userServ.showByUserName(principal.getName()).getRole().equals("admin");
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