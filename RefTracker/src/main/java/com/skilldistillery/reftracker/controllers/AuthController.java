package com.skilldistillery.reftracker.controllers;

import java.security.Principal;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.reftracker.entities.User;
import com.skilldistillery.reftracker.services.AuthService;

@RestController
@CrossOrigin({ "*", "http://localhost:4200" })
public class AuthController {

	@Autowired
	private AuthService authService;

	@PostMapping(path = "register")
	public User register(@RequestBody User user, HttpServletResponse resp) {

		if (user == null) {
			resp.setStatus(400);
		}
		
		user.setRole("user");
		user = authService.register(user);

		return user;
	}

	@GetMapping(path = "authenticate")
	public Principal authenticate(Principal principal) {
		return principal;
	}

}
