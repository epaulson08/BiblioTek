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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ericpaulsondev.reftracker.entities.User;
import com.ericpaulsondev.reftracker.repositories.UserRepository;
import com.ericpaulsondev.reftracker.services.AuthService;
import com.ericpaulsondev.reftracker.services.UserService;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost:4200" })
public class UserController {

	@Autowired
	private UserService userSvc;

	@Autowired
	private AuthService authSvc;

	@Autowired
	private UserRepository userRepo;

	@GetMapping("users")
	public List<User> index(HttpServletRequest req, HttpServletResponse res, Principal principal) {

		List<User> users = userSvc.index(principal.getName());
		if (users == null) {
			res.setStatus(401);
		} else if (users.size() == 0) {
			res.setStatus(204);
		}

		return users;
	}

	@GetMapping("users/search/{username}")
	public User showByUsername(HttpServletRequest req, HttpServletResponse res, @PathVariable String username,
			Principal principal) {
		if (principal.getName().equals(username)) {
			User user = userSvc.showByUserName(username);
			if (user != null) {
				res.setStatus(200);
				return user;
			} else {
				res.setStatus(404);
			}
		} else {
			res.setStatus(401);
		}
		return null;
	}

	@GetMapping("users/{uid}")
	public User show(HttpServletRequest req, HttpServletResponse res, @PathVariable int uid, Principal principal) {

		User user = userSvc.show(principal.getName(), uid);
		if (user == null) {
			res.setStatus(404);
		} else if (user.getId() == -1) {
			res.setStatus(401);
			user = null;
		}
		return user;
	}

	@PostMapping("users")
	public User create(HttpServletRequest req, HttpServletResponse res, @RequestBody User user, Principal principal) {

		User adminUser = userRepo.findByUsername(principal.getName());
		if (adminUser == null || !adminUser.getRole().equalsIgnoreCase("admin")) {
			res.setStatus(401);
			return null;
		}

		try {
			user = authSvc.register(user);
			if (user != null) {
				res.setStatus(201);
				String url = req.getRequestURL().append("/").append(user.getId()).toString();
				res.setHeader("Location", url);
			} else {
				res.setStatus(400);
			}
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println(e);
			res.setStatus(400);
			return null;
		}
		return user;
	}

	@PutMapping("users/{uid}")
	public User update(HttpServletRequest req, HttpServletResponse res, @PathVariable int uid, @RequestBody User user,
			Principal principal) {
		if (user == null) {
			res.setStatus(400);
			return null;
		}
		try {
			user = userSvc.update(principal.getName(), uid, user);
			if (user != null) {
				if (user.getId() == -10) {
					res.setStatus(401);
					user = null;
				} else {
					res.setStatus(200);
					res.setHeader("Location", req.getRequestURL().toString());
				}
			} else {
				res.setStatus(404);
			}

		} catch (Exception e) {
			System.err.println(e);
			res.setStatus(400);
			user = null;
		}

		return user;
	}

	@DeleteMapping("users/{uid}")
	public void deactivate(HttpServletRequest req, HttpServletResponse res, @PathVariable int uid,
			Principal principal) {
		res.setStatus(userSvc.deactivate(principal.getName(), uid));
	}
}
