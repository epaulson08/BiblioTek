package com.skilldistillery.reftracker.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.reftracker.entities.CitationStyle;
import com.skilldistillery.reftracker.services.CitationStyleService;

@CrossOrigin({ "*", "http://localhost:4200" })
@RestController
public class CitationStyleController {

	@Autowired
	private CitationStyleService csServ;
	
	// TODO: set resp
	@GetMapping("api/citation-styles")
	public List<CitationStyle> index() {
		return csServ.index();
	}
	
	// TODO: set resp
	@GetMapping("api/users/citation-styles")
	public List<CitationStyle> findByUsersUsername(String username) {
		return csServ.findByUsersUsername(username);
	}

}