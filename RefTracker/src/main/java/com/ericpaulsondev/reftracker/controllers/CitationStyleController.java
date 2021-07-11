package com.ericpaulsondev.reftracker.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ericpaulsondev.reftracker.entities.CitationStyle;
import com.ericpaulsondev.reftracker.services.CitationStyleService;

@CrossOrigin({ "*", "http://localhost:4200" })
@RestController
public class CitationStyleController {

	@Autowired
	private CitationStyleService csServ;
	
	@GetMapping("api/all/citation-styles")
	public List<CitationStyle> index(HttpServletResponse resp) {
		List<CitationStyle> allCitationStyles = csServ.index();
		if (allCitationStyles != null) {
			resp.setStatus(200);
			return allCitationStyles;
		}
		else {
			resp.setStatus(404);
			return null;
		}
	}
	
	@GetMapping("api/citation-styles")
	public List<CitationStyle> findByUsersUsername(Principal principal, HttpServletResponse resp) {
		List<CitationStyle> citationStylesOfUser = csServ.findByUsersUsername(principal.getName());
		if (citationStylesOfUser != null) {
			resp.setStatus(200);
			return citationStylesOfUser;
		}
		else {
			resp.setStatus(404);
			return null;
		}
	}

}