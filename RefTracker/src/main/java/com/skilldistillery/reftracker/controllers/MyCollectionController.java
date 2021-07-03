package com.skilldistillery.reftracker.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.reftracker.entities.MyCollection;
import com.skilldistillery.reftracker.services.MyCollectionService;

@CrossOrigin({ "*", "http://localhost:4200" })
@RestController
public class MyCollectionController {

	@Autowired
	private MyCollectionService collServ;

	@GetMapping("api/collections")
	public List<MyCollection> findByUserUsername(Principal principal, HttpServletResponse resp) {
		List<MyCollection> myColls = collServ.findByUserUsername(principal.getName());
		if (myColls != null) {
				resp.setStatus(200);
				return myColls;			
				}
		else {
			resp.setStatus(404);
			return null;
		}
	}

	@GetMapping("collections/{id}")
	public MyCollection findById(@PathVariable Integer id, HttpServletResponse resp) {
		MyCollection coll = collServ.findById(id);
		if (coll == null)
			resp.setStatus(404);
		else
			resp.setStatus(200);
		return coll;
	}

}