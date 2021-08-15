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
import com.ericpaulsondev.reftracker.services.AuthService;
import com.ericpaulsondev.reftracker.services.JournalArticleService;

@CrossOrigin({ "*", "http://localhost:4200" })
@RestController
public class JournalArticleController {

	@Autowired
	private JournalArticleService jaServ;

	@Autowired
	private AuthService authServ;

	@GetMapping("api/articles")
	public List<JournalArticle> findAllAsUser(Principal principal, HttpServletResponse resp) {
		// admin
		if (authServ.isAdmin(principal)) {
			resp.setStatus(405);
			return null;
		}
		// user
		else {
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
	}

	@GetMapping("api/all/articles")
	public List<JournalArticle> findAllAsAdmin(Principal principal, HttpServletResponse resp) {
		// admin
		if (authServ.isAdmin(principal)) {
			List<JournalArticle> allArticles = jaServ.index();
			if (allArticles == null) {
				resp.setStatus(404);
				return null;
			}
			resp.setStatus(200);
			return allArticles;
		}
		// user
		else {
			resp.setStatus(403);
			return null;
		}
	}

	@GetMapping("api/all/articles/{id}")
	public JournalArticle findByIdAsAdmin(@PathVariable int id, Principal principal, HttpServletResponse resp) {
		// user
		if (!authServ.isAdmin(principal)) {
			resp.setStatus(403);
			return null;
		}
		// admin
		else {
			JournalArticle ja = jaServ.findById(id);
			if (ja == null) {
				resp.setStatus(404);
				return null;
			} else {
				resp.setStatus(200);
				return ja;
			}
		}
	}

	@GetMapping("api/articles/{id}")
	public JournalArticle findByIdAndUsersUsername(@PathVariable int id, Principal principal,
			HttpServletResponse resp) {
		// admin
		if (authServ.isAdmin(principal)) {
			resp.setStatus(405);
			return null;
		}
		// user, does NOT own article
		if (!authServ.journalArticleBelongsToPrincipal(id, principal)) {
			resp.setStatus(403);
			return null;
		}
		// user, owns article
		JournalArticle ja = jaServ.findById(id);
		if (ja == null) {
			resp.setStatus(404);
			return null;
		} else {
			resp.setStatus(200);
			return ja;
		}
	}

	@GetMapping("api/articles/journals/{journalId}")
	public List<JournalArticle> findAllByJournalIdAndUsersUsername(@PathVariable int journalId, Principal principal,
			HttpServletResponse resp) {
		// admin
		if (authServ.isAdmin(principal)) {
			resp.setStatus(405);
			return null;
		}
		// user
		else {
			List<JournalArticle> results = jaServ.findByJournalIdAndUsersUsername(journalId, principal.getName());
			if (results != null) {
				resp.setStatus(200);
				return results;
			} else {
				resp.setStatus(404);
				return null;
			}
		}
	}

	@GetMapping("api/articles/search/{searchTerm}")
	public List<JournalArticle> search(@PathVariable String searchTerm, Principal principal, HttpServletResponse resp) {
		// admin
		if (authServ.isAdmin(principal)) {
			resp.setStatus(405);
			return null;
		}
		// user
		else {
			List<JournalArticle> results = jaServ.search(searchTerm);
			if (results == null) {
				resp.setStatus(404);
				return null;
			} else {
				resp.setStatus(200);
				return results;
			}
		}
	}

	@GetMapping("api/all/articles/search/{searchTerm}")
	public List<JournalArticle> searchAll(@PathVariable String searchTerm, Principal principal,
			HttpServletResponse resp) {
		// user
		if (!authServ.isAdmin(principal)) {
			resp.setStatus(403);
			return null;
		}
		// admin
		else {
			List<JournalArticle> results = jaServ.search(searchTerm);
			if (results == null) {
				resp.setStatus(404);
				return null;
			} else {
				resp.setStatus(200);
				return results;
			}
		}
	}

	@GetMapping("api/all/articles/aggregates/count")
	public Long countAsAdmin(Principal principal, HttpServletResponse resp) {
		// user
		if (!authServ.isAdmin(principal)) {
			resp.setStatus(403);
			return null;
		}
		// admin
		else {
			long count = jaServ.count();
			resp.setStatus(200);
			return count;
		}
	}

	@GetMapping("api/articles/aggregates/count")
	public Long countAsUser(Principal principal, HttpServletResponse resp) {
		// admin
		if (authServ.isAdmin(principal)) {
			resp.setStatus(405);
			return null;
		}
		// user
		else {
			Long toReturn = jaServ.countByUsername(principal.getName());
			resp.setStatus(200);
			return toReturn;
		}
	}

	@PostMapping("api/articles")
	public JournalArticle create(@RequestBody JournalArticle ja, Principal principal, HttpServletRequest req,
			HttpServletResponse resp) {
		// null input
		if (ja == null || ja.getAuthors() == null) {
			resp.setStatus(400);
			return null;
		}
		// admin
		if (authServ.isAdmin(principal)) {
			resp.setStatus(405);
			return null;
		}
		// user
		JournalArticle managedJA = jaServ.create(ja, principal.getName());
		resp.setStatus(201);

		StringBuffer url = req.getRequestURL();
		url.append("/").append(managedJA.getId());
		resp.setHeader("Location", url.toString());

		return managedJA;
	}

	@PostMapping("api/articles/{jaId}/add-author/{authorId}")
	public JournalArticle addAuthor(@PathVariable Integer jaId, @PathVariable Integer authorId, Principal principal,
			HttpServletResponse resp) {
		// admin
		if (authServ.isAdmin(principal)) {
			resp.setStatus(400);
			return null;
		}
		// user, does NOT own JournalArticle
		if (!authServ.journalArticleBelongsToPrincipal(jaId, principal)) {
			resp.setStatus(403);
			return null;
		}
		// user, owns JournalArticle
		JournalArticle ja = jaServ.findById(jaId);
		if (ja == null) {
			resp.setStatus(404);
			return null;
		}
		jaServ.addAuthor(jaId, authorId);
		return ja;
	}

	@PostMapping("api/articles/{jaId}/remove-author/{authorId}")
	public JournalArticle removeAuthor(@PathVariable Integer jaId, @PathVariable Integer authorId, Principal principal,
			HttpServletResponse resp) {
		// admin
		if (authServ.isAdmin(principal)) {
			resp.setStatus(400);
			return null;
		}
		// user, does NOT own JournalArticle
		if (!authServ.journalArticleBelongsToPrincipal(jaId, principal)) {
			resp.setStatus(403);
			return null;
		}
		// user, owns JournalArticle
		JournalArticle ja = jaServ.findById(jaId);
		if (ja == null) {
			resp.setStatus(404);
			return null;
		}
		jaServ.removeAuthor(jaId, authorId);
		return ja;
	}

	@PutMapping("api/articles/{id}")
	public JournalArticle update(@PathVariable Integer id, @RequestBody JournalArticle ja, Principal principal,
			HttpServletResponse resp) {
		// null request body
		if (ja == null) {
			resp.setStatus(400);
			return null;
		}
		// admin
		if (authServ.isAdmin(principal)) {
			resp.setStatus(405);
			return null;
		}
		// user, NOT owner of JournalArticle
		if (!authServ.journalArticleBelongsToPrincipal(id, principal)) {
			resp.setStatus(403);
			return null;
		}
		return jaServ.update(id, ja);
	}

	@DeleteMapping("api/all/articles/{id}")
	public boolean deleteAsAdmin(@PathVariable Integer id, Principal principal, HttpServletResponse resp) {
		// user
		if (!authServ.isAdmin(principal)) {
			resp.setStatus(403);
			return false;
		}
		// admin
		if (jaServ.delete(id)) {
			resp.setStatus(204);
			return true;
		} else {
			resp.setStatus(404);
			return false;
		}
	}

	@DeleteMapping("api/articles/{id}")
	public boolean deleteAsUser(@PathVariable Integer id, Principal principal, HttpServletResponse resp) {
		// admin
		if (authServ.isAdmin(principal)) {
			resp.setStatus(405);
			return false;
		}
		// user, does NOT own JournalArticle
		if (!authServ.journalArticleBelongsToPrincipal(id, principal)) {
			resp.setStatus(403);
			return false;
		}
		// user, owns JournalArticle
		if (jaServ.delete(id)) {
			resp.setStatus(204);
			return true;
		} else {
			resp.setStatus(404);
			return false;
		}
	}

}
