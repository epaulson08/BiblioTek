package com.ericpaulsondev.reftracker.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ericpaulsondev.reftracker.entities.Journal;
import com.ericpaulsondev.reftracker.services.JournalService;

@CrossOrigin({ "*", "http://localhost:4200" })
@RequestMapping("api")
@RestController
public class JournalController {

	@Autowired
	private JournalService jServ;

	@GetMapping("journals")
	public List<Journal> findAllOrderByName() {
		return jServ.findAllOrderByName();
	}
}