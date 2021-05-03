package com.skilldistillery.reftracker.controllers;

import java.util.ArrayList;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.reftracker.entities.Author;
import com.skilldistillery.reftracker.entities.JournalArticle;
import com.skilldistillery.reftracker.services.AuthorService;
import com.skilldistillery.reftracker.services.JournalArticleService;

@CrossOrigin({ "*", "http://localhost:4300" })
@RequestMapping("api")
@RestController
public class JournalArticleController {

	@Autowired
	private JournalArticleService jaServ;

	@GetMapping("articles")
	public List<JournalArticle> index() {
		return jaServ.index();
	}

	@GetMapping("articles/{id}")
	public JournalArticle findById(@PathVariable Integer id, HttpServletResponse resp) {
		JournalArticle ja = jaServ.findById(id);
		if (ja == null) {
			resp.setStatus(404);
		}
		return ja;
	}
	
	@GetMapping("articles/journals/{journalId}")
	public List<JournalArticle> findAllByJournalId(@PathVariable int journalId, HttpServletResponse resp) {
		if (journalId < 0) {
			resp.setStatus(400);
			return null;
		}
		
		List<JournalArticle> results = null;
		results = jaServ.findArticlesByJournalId(journalId);
		resp.setStatus(200);
		return results;
	}

	@GetMapping("articles/search/{searchTerm}")
	public List<JournalArticle> search(@PathVariable String searchTerm) {
		return jaServ.search(searchTerm);
	}

	@GetMapping("articles/aggregates/count")
	public long count() {
		return jaServ.count();
	}

	@PostMapping("articles")
	public JournalArticle create(@RequestBody PayloadUtility payload, HttpServletRequest req,
			HttpServletResponse resp) {
		System.out.println(payload);
		System.out.println(payload.getAuthors());
		
		
		if (payload == null || payload.getAuthors() == null || payload.getJa() == null) {
			resp.setStatus(400);
			return null;
		}

		try {
			JournalArticle managedJA = jaServ.create(payload);
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

	@PutMapping("articles/{id}")
	public JournalArticle update(@PathVariable Integer id, @RequestBody JournalArticle ja, HttpServletResponse resp) {
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

	@PutMapping("articles/{jaId}/authors/{authorId}")
	public JournalArticle addAuthor(@PathVariable Integer jaId, @PathVariable Integer authorId,
			HttpServletResponse resp) {
		JournalArticle ja = null;

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

	@DeleteMapping("articles/{id}")
	public boolean delete(@PathVariable Integer id, HttpServletResponse resp) {
		boolean victory = false;
		try {
			if (jaServ.delete(id)) {
				resp.setStatus(204);
				victory = true;
			} else
				resp.setStatus(404);
		} catch (Exception e) {
			System.err.println(e);
			resp.setStatus(400);
		}
		return victory;
	}
}
