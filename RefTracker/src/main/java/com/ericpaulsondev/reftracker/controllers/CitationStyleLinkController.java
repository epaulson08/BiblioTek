package com.ericpaulsondev.reftracker.controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.ericpaulsondev.reftracker.entities.CitationStyleLink;
import com.ericpaulsondev.reftracker.services.CitationStyleLinkService;

@CrossOrigin({ "*", "http://localhost:4200" })
@RestController
public class CitationStyleLinkController {

	@Autowired
	CitationStyleLinkService cslServ;

	@GetMapping("api/citation-style-link/{citationStyleId}")
	public List<CitationStyleLink> findByCitationStyleId(@PathVariable Integer citationStyleId,
			HttpServletResponse resp) {
		List<CitationStyleLink> links = cslServ.findByCitationStyleId(citationStyleId);
		if (links == null) {
			resp.setStatus(404);
			return null;
		} else {
			resp.setStatus(200);
			return links;
		}
	}

}
