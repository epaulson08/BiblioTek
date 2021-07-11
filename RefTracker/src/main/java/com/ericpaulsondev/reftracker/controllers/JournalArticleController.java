package com.ericpaulsondev.reftracker.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
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

import com.ericpaulsondev.reftracker.entities.JournalArticle;
import com.ericpaulsondev.reftracker.entities.User;
import com.ericpaulsondev.reftracker.services.JournalArticleService;
import com.ericpaulsondev.reftracker.services.UserService;

@CrossOrigin({ "*", "http://localhost:4200" })
@RestController
public class JournalArticleController {

	@Autowired
	private JournalArticleService jaServ;

	@Autowired
	private UserService userServ;

	@GetMapping("api/all/articles")
	public List<JournalArticle> index(Principal principal, HttpServletResponse resp) {
		if (isAdmin(principal)) {
			List<JournalArticle> allArticles = jaServ.index();
			resp.setStatus(200);
			return allArticles;
		} else {
			resp.setStatus(403);
			return null;
		}
	}

	@GetMapping("api/articles/")
	public List<JournalArticle> findByUser(Principal principal, HttpServletResponse resp) {
		String username = principal.getName();
		List<JournalArticle> jasOfUser = jaServ.findByUser(username);
		if (jasOfUser == null) {
			resp.setStatus(404);
			return null;
		} else {
			resp.setStatus(200);
			return jasOfUser;
		}
	}

	@GetMapping("api/all/articles/{id}")
	public JournalArticle findById(@PathVariable Integer id, Principal principal, HttpServletResponse resp) {
		if (isAdmin(principal)) {
			JournalArticle ja = jaServ.findById(id);
			if (ja == null) {
				resp.setStatus(404);
			}
			return ja;
		} else {
			resp.setStatus(403);
			return null;
		}
	}

	@GetMapping("api/articles/{id}")
	public JournalArticle findByIdAndUsersUsername(@PathVariable int id, Principal principal,
			HttpServletResponse resp) {
		if (belongsToUser(id, principal)) {
			JournalArticle ja = jaServ.findById(id);
			if (ja == null) {
				resp.setStatus(404);
				return null;
			}
			else {
				resp.setStatus(200);
				return ja;
			}
		}
		else {
			resp.setStatus(404);
			return null;
		}
	}
	
	//FIXME: HTTP response codes are improved up to here

	@GetMapping("api/articles/journals/{journalId}")
	public List<JournalArticle> findAllByJournalIdAndUsersUsername(@PathVariable int journalId, Principal principal,
			HttpServletResponse resp) {

		if (journalId < 0) {
			resp.setStatus(400);
			return null;
		}

		List<JournalArticle> results = null;
		results = jaServ.findByJournalIdAndUsersUsername(journalId, principal.getName());
		resp.setStatus(200);
		return results;
	}

	@GetMapping("api/all/articles/search/{searchTerm}")
	public List<JournalArticle> searchAll(@PathVariable String searchTerm, Principal principal) {
		if (isAdmin(principal))
			return jaServ.search(searchTerm);
		return null;
	}

	@GetMapping("api/articles/search/{searchTerm}")
	public List<JournalArticle> search(@PathVariable String searchTerm, Principal principal) {
		// FIXME: return only Principal's articles
		return jaServ.search(searchTerm);
	}

	@GetMapping("api/all/articles/aggregates/count")
	public Long count(Principal principal) {
		if (isAdmin(principal))
			return jaServ.count();
		return null;
	}

	@PostMapping("api/articles")
	public JournalArticle create(@RequestBody PayloadUtility payload, Principal principal, HttpServletRequest req,
			HttpServletResponse resp) {

		if (payload == null || payload.getAuthors() == null || payload.getJa() == null) {
			resp.setStatus(400);
			return null;
		}

		try {
			JournalArticle managedJA = jaServ.create(payload, principal.getName());
			resp.setStatus(201);

			StringBuffer url = req.getRequestURL();
			url.append("/").append(managedJA.getId());
			resp.setHeader("Location", url.toString());

			return managedJA;

		} catch (Exception e) {
			System.err.println(e);
			e.printStackTrace();
			resp.setStatus(400);
			return null;
		}
	}

	@PutMapping("api/articles/{id}")
	public JournalArticle update(@PathVariable Integer id, @RequestBody JournalArticle ja, Principal principal,
			HttpServletResponse resp) {
		if (belongsToUser(id, principal)) {
			try {
				ja = jaServ.update(id, ja);
				if (ja == null) {
					resp.setStatus(404);
				}
			} catch (Exception e) {
				System.err.println(e);
				resp.setStatus(400);
				ja = null;
			}
			return ja;
		}
		return null;
	}

	@PutMapping("api/articles/{jaId}/authors/{authorId}")
	public JournalArticle addAuthor(@PathVariable Integer jaId, @PathVariable Integer authorId, Principal principal,
			HttpServletResponse resp) {
		JournalArticle ja = null;

		if (belongsToUser(jaId, principal)) {
			try {
				ja = jaServ.findById(jaId);

				jaServ.addAuthor(jaId, authorId);

				if (ja == null) {
					resp.setStatus(404);
				}
			} catch (Exception e) {
				System.err.println(e);
				resp.setStatus(400);
				ja = null;
			}
			return ja;
		}
		return null;
	}

	@DeleteMapping("api/articles/{id}")
	public boolean delete(@PathVariable Integer id, Principal principal, HttpServletResponse resp) {
		if (belongsToUser(id, principal)) {
			try {
				if (jaServ.delete(id)) {
					resp.setStatus(204);
					return true;
				} else
					resp.setStatus(404);
			} catch (Exception e) {
				System.err.println(e);
				resp.setStatus(400);
			}
		}
		return false;
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

	private boolean belongsToUser(int journalArticleId, Principal principal) {
		try {
			User user = userServ.showByUserName(principal.getName());
			JournalArticle managedJa = jaServ.findById(journalArticleId);
			if (managedJa.getUsers().contains(user))
				return true;
			return false;
		} catch (NullPointerException npe) {
			return false;
		}
	}

}