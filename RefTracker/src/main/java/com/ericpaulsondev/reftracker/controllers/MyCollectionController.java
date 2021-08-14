package com.ericpaulsondev.reftracker.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ericpaulsondev.reftracker.entities.MyCollection;
import com.ericpaulsondev.reftracker.services.AuthService;
import com.ericpaulsondev.reftracker.services.MyCollectionService;
import com.ericpaulsondev.reftracker.services.UserService;

@CrossOrigin({ "*", "http://localhost:4200" })
@RestController
public class MyCollectionController {

	@Autowired
	private MyCollectionService collServ;
	@Autowired
	private UserService userServ;
	@Autowired
	private AuthService authServ;

	@GetMapping("api/collections")
	public List<MyCollection> findByUserUsername(Principal principal, HttpServletResponse resp) {
		// admin: 405 method not supported
		if (authServ.isAdmin(principal)) {
			resp.setStatus(405);
			return null;
		}
		// user
		else {
			List<MyCollection> myColls = collServ.findByUserUsername(principal.getName());
			// article belongs to user: 200 OK
			if (myColls != null) {
				resp.setStatus(200);
				return myColls;
			}
			// article does not belong to user: 404 not found
			else {
				resp.setStatus(404);
				return null;
			}
		}
	}

	@GetMapping("api/collections/{id}")
	public MyCollection findByIdAsUser(@PathVariable Integer id, HttpServletResponse resp, Principal principal) {
		// admin
		if (authServ.isAdmin(principal)) {
			resp.setStatus(405);
			return null;
		} else {
			// user: owns requested MyCollection
			if (authServ.myCollectionBelongsToPrincipal(id, principal)) {
				MyCollection toReturn = collServ.findById(id);
				resp.setStatus(200);
				return toReturn;
			}
			// user: does NOT own MyCollection
			else {
				resp.setStatus(403);
				return null;
			}
		}
	}

	@GetMapping("api/all/collections/{id}")
	public MyCollection findByIdAsAdmin(@PathVariable Integer id, HttpServletResponse resp, Principal principal) {
		// admin
		if (authServ.isAdmin(principal)) {
			MyCollection coll = collServ.findById(id);
			// no such MyCollection: 404 not found
			if (coll == null) {
				resp.setStatus(404);
				return null;
			}
			// MyCollection exists: 200 OK
			else {
				resp.setStatus(200);
				return coll;
			}
		}
		// user: access denied: 403 forbidden
		else {
			resp.setStatus(403);
			return null;
		}
	}

	@GetMapping("api/all/collections/users/{userId}")
	public List<MyCollection> findByUserId(@PathVariable Integer userId, HttpServletResponse resp,
			Principal principal) {
		// admin
		if (authServ.isAdmin(principal)) {
			List<MyCollection> toReturn = collServ.findByUserId(userId);
			// requested user has MyCollections: 200 OK
			if (toReturn != null) {
				resp.setStatus(200);
			}
			// requested user has no MyCollections: 404 not found
			else {
				resp.setStatus(404);
			}
			return toReturn;
		}
		// user: 403 forbidden
		else {
			resp.setStatus(403);
			return null;
		}
	}

	@PostMapping("api/collections")
	public MyCollection create(@RequestBody MyCollection myColl, HttpServletResponse resp, Principal principal) {
		// admin: 405 method not supported
		if (authServ.isAdmin(principal)) {
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

	@PostMapping("api/collections/{myCollectionId}/add-article/{journalArticleId}")
	public MyCollection addJournalArticle(@PathVariable Integer myCollectionId, @PathVariable Integer journalArticleId,
			Principal principal, HttpServletResponse resp) {
		// admin: 405 method not supported
		if (authServ.isAdmin(principal)) {
			resp.setStatus(405);
			return null;
		} else {
			// user: does not own MyCollection OR JournalArticle: 403 forbidden
			if (!authServ.myCollectionBelongsToPrincipal(myCollectionId, principal)
					|| !authServ.journalArticleBelongsToPrincipal(journalArticleId, principal)) {
				resp.setStatus(403);     
				return null;
			} else {
				// user: owns MyCollection AND JournalArticle: 200 OK
				MyCollection toReturn = collServ.addJournalArticle(myCollectionId, journalArticleId);
				resp.setStatus(200);
				return toReturn;
			}
		}
	}

	@PostMapping("api/collections/{myCollectionId}/remove-article/{journalArticleId}")
	public MyCollection removeJournalArticle(@PathVariable Integer myCollectionId,
			@PathVariable Integer journalArticleId, Principal principal, HttpServletResponse resp) {
		// admin: 405 method not supported
		if (authServ.isAdmin(principal)) {
			resp.setStatus(405);
			return null;
		} else {
			// user: does not own MyCollection OR JournalArticle: 403 forbidden
			if (!authServ.myCollectionBelongsToPrincipal(myCollectionId, principal)
					|| !authServ.journalArticleBelongsToPrincipal(journalArticleId, principal)) {
				resp.setStatus(403);
				return null;
			} else {
				// user: owns MyCollection AND JournalArticle: 200 OK
				MyCollection toReturn = collServ.removeJournalArticle(myCollectionId, journalArticleId);
				resp.setStatus(200);
				return toReturn;
			}

		}

	}

	@PutMapping("api/collections/{myCollectionId}")
	public MyCollection update(@PathVariable Integer myCollectionId, @RequestBody MyCollection myColl,
			Principal principal, HttpServletResponse resp) {
		// admin: 405 method not allowed
		if (authServ.isAdmin(principal)) {
			resp.setStatus(405);
			return null;
		} else {
			// user: owns article: 200 OK
			if (authServ.myCollectionBelongsToPrincipal(myCollectionId, principal)) {
				resp.setStatus(200);
				return collServ.update(myCollectionId, myColl);
			}
			// user: doesn't own article: 403 forbidden
			else {
				resp.setStatus(403);
				return null;
			}
		}
	}

	@DeleteMapping("api/collections/{myCollectionId}")
	public void deleteAsUser(@PathVariable Integer myCollectionId, Principal principal, HttpServletResponse resp) {
		// admin: 405 method not allowed
		if (authServ.isAdmin(principal)) {
			resp.setStatus(405);
			return;
		} else {
			// user: does own MyCollection: 204 no content
			if (authServ.myCollectionBelongsToPrincipal(myCollectionId, principal)) {
				collServ.delete(myCollectionId);
				resp.setStatus(204);
				return;
			} else {
				// user: does NOT own MyCollection: 403 forbidden
				resp.setStatus(403);
				return;
			}
		}
	}

	@DeleteMapping("api/all/collections/{myCollectionId}")
	public void deleteAsAdmin(@PathVariable Integer myCollectionId, Principal principal, HttpServletResponse resp) {
		// admin: 204 no content
		if (authServ.isAdmin(principal)) {
			if (collServ.findById(myCollectionId) == null) {
				resp.setStatus(404);
				return;
			} else {
				collServ.delete(myCollectionId);
				resp.setStatus(204);
				return;
			}
		} else {
			// user: 403 forbidden
			resp.setStatus(403);
			return;
		}
	}

}