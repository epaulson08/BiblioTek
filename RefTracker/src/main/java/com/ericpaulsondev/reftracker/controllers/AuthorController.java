package com.ericpaulsondev.reftracker.controllers;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ericpaulsondev.reftracker.entities.Author;
import com.ericpaulsondev.reftracker.services.AuthorService;

@CrossOrigin({ "*", "http://localhost:4200" })
@RequestMapping("api")
@RestController
public class AuthorController {

	@Autowired
	private AuthorService aServ;

	@GetMapping("authors/{id}")
	public Author findById(@PathVariable Integer id, HttpServletResponse resp) {
		Author author = aServ.findById(id);
		if (author == null) {
			resp.setStatus(404);
			return null;
		}
		else {
			resp.setStatus(200);
			return author;
		}
	}	

	@PostMapping("authors")
	public Author create(@RequestBody Author author, HttpServletRequest req, HttpServletResponse resp) {
		try {
			aServ.create(author);
			resp.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(author.getId());
			resp.setHeader("Location", url.toString());
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(400);
			author = null;
		}
		return author;
	}

}