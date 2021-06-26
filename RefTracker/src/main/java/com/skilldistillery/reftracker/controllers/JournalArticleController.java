package com.skilldistillery.reftracker.controllers;

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

import com.skilldistillery.reftracker.entities.JournalArticle;
import com.skilldistillery.reftracker.entities.User;
import com.skilldistillery.reftracker.services.JournalArticleService;
import com.skilldistillery.reftracker.services.UserService;

/**
 * This class defines the REST API for accessing {@code JournalArticles}.
 *
 * API endpoints starting with `all` will obtain results across all users, and
 * are not intended to be exposed to users. They may be accessed by admins.
 * 
 * <h3>REST API paths:</h3>
 * <table>
 * <thead>
 * <tr>
 * <th>Request Type</th>
 * <th>Path</th>
 * </tr>
 * </thead> <tbody>
 * <tr>
 * <td>GET</td>
 * <td>api/all/articles</td>
 * </tr>
 * <tr>
 * <td>GET</td>
 * <td>api/articles</td>
 * </tr>
 * <tr>
 * <td>GET</td>
 * <td>api/all/articles/{id}</td>
 * </tr>
 * <tr>
 * <td>GET</td>
 * <td>api/articles/{id}</td>
 * </tr>
 * <tr>
 * <td>GET</td>
 * <td>api/articles/journals/{journalId}</td>
 * </tr>
 * <tr>
 * <td>GET</td>
 * <td>api/all/articles/search/{searchTerm}</td>
 * </tr>
 * <tr>
 * <td>GET</td>
 * <td>api/articles/search/{searchTerm}</td>
 * </tr>
 * <tr>
 * <td>GET</td>
 * <td>api/all/articles/aggregates/count</td>
 * </tr>
 * <tr>
 * <td>POST</td>
 * <td>api/articles</td>
 * </tr>
 * <tr>
 * <td>PUT</td>
 * <td>api/articles/{id}</td>
 * </tr>
 * <tr>
 * <td>PUT</td>
 * <td>api/articles/{jaId}/authors/{authorId}</td>
 * </tr>
 * <tr>
 * <td>DELETE</td>
 * <td>api/articles/{id}</td>
 * </tr>
 * </tbody>
 * </table>
 */

@CrossOrigin({ "*", "http://localhost:4200" })
@RestController
public class JournalArticleController {
	
	/*
	 * FIXME
	 * Update HTTP responses
	 */
	
	@Autowired
	private JournalArticleService jaServ;

	@Autowired
	private UserService userServ;

	private boolean isAdmin(Principal principal) {
		return userServ.showByUserName(principal.getName()).getRole().equals("admin");
	}

	private boolean belongsToUser(JournalArticle ja, Principal principal) {
		User user = userServ.showByUserName(principal.getName());
		JournalArticle managedJa = jaServ.findById(ja.getId());
		if (managedJa.getUsers().contains(user))
			return true;
		return false;
	}

	private boolean belongsToUser(int journalArticleId, Principal principal) {
		User user = userServ.showByUserName(principal.getName());
		JournalArticle managedJa = jaServ.findById(journalArticleId);
		if (managedJa.getUsers().contains(user))
			return true;
		return false;

	}

	@GetMapping("api/all/articles")
	public List<JournalArticle> index(Principal principal) {
		if (isAdmin(principal))
			return jaServ.index();
		return null;
	}

	@GetMapping("api/articles/")
	public List<JournalArticle> findByUser(HttpServletResponse resp, Principal principal) {
		String username = principal.getName();
		List<JournalArticle> jas = jaServ.findByUser(username);
		if (jas == null) {
			resp.setStatus(404);
		}
		return jas;
	}

	@GetMapping("api/all/articles/{id}")
	public JournalArticle findById(@PathVariable Integer id, Principal principal, HttpServletResponse resp) {
		if (isAdmin(principal)) {
			JournalArticle ja = jaServ.findById(id);
			if (ja == null) {
				resp.setStatus(404);
			}
			return ja;
		}
		return null;
	}

	@GetMapping("api/articles/{id}")
	public JournalArticle findByIdAndUsersUsername(@PathVariable int id, Principal principal,
			HttpServletResponse resp) {
		if (belongsToUser(id, principal)) {
			JournalArticle ja = jaServ.findById(id);
			if (ja == null) {
				resp.setStatus(404);
			}
			return ja;
		}
		return null;
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
		if (belongsToUser(ja, principal)) {
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
}
