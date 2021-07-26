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
import com.ericpaulsondev.reftracker.services.JournalArticleService;
import com.ericpaulsondev.reftracker.services.UserService;
import com.ericpaulsondev.reftracker.util.UtilPayload;
import com.ericpaulsondev.reftracker.util.UtilCheckUserAccess;

@CrossOrigin({ "*", "http://localhost:4200" })
@RestController
public class JournalArticleController {

	@Autowired
	private JournalArticleService jaServ;

	@Autowired
	private UserService userServ;

	@GetMapping("api/articles")
	public List<JournalArticle> findAllAsUser(Principal principal, HttpServletResponse resp) {
		// admin
		if (UtilCheckUserAccess.isAdmin(principal, this.userServ)) {
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
		if (UtilCheckUserAccess.isAdmin(principal, this.userServ)) {
			List<JournalArticle> allArticles = jaServ.index();
			resp.setStatus(200);
			return allArticles;
		} else {
			resp.setStatus(403);
			return null;
		}
	}

	@GetMapping("api/all/articles/{id}")
	public JournalArticle findById(@PathVariable Integer id, Principal principal, HttpServletResponse resp) {
		if (UtilCheckUserAccess.isAdmin(principal, this.userServ)) {
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
		if (UtilCheckUserAccess.journalArticleBelongsToPrincipal(id, principal, userServ, jaServ)) {
			JournalArticle ja = jaServ.findById(id);
			if (ja == null) {
				resp.setStatus(404);
				return null;
			} else {
				resp.setStatus(200);
				return ja;
			}
		} else {
			resp.setStatus(404);
			return null;
		}
	}

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
		if (UtilCheckUserAccess.isAdmin(principal, this.userServ))
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
		if (UtilCheckUserAccess.isAdmin(principal, this.userServ))
			return jaServ.count();
		return null;
	}

	@PostMapping("api/articles")
	public JournalArticle create(@RequestBody UtilPayload payload, Principal principal, HttpServletRequest req,
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

	@PostMapping("api/articles/{jaId}/add-author/{authorId}")
	public JournalArticle addAuthor(@PathVariable Integer jaId, @PathVariable Integer authorId, Principal principal,
			HttpServletResponse resp) {
		JournalArticle ja = null;

		if (UtilCheckUserAccess.journalArticleBelongsToPrincipal(jaId, principal, this.userServ, this.jaServ)) {
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

	@PutMapping("api/articles/{id}")
	public JournalArticle update(@PathVariable Integer id, @RequestBody JournalArticle ja, Principal principal,
			HttpServletResponse resp) {
		if (UtilCheckUserAccess.journalArticleBelongsToPrincipal(id, principal, this.userServ, this.jaServ)) {
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

	@DeleteMapping("api/articles/{id}")
	public boolean delete(@PathVariable Integer id, Principal principal, HttpServletResponse resp) {
		if (UtilCheckUserAccess.journalArticleBelongsToPrincipal(id, principal, this.userServ, this.jaServ)) {
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

}
