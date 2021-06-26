package com.skilldistillery.reftracker.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.reftracker.entities.User;
import com.skilldistillery.reftracker.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepo;

	@Override
	public List<User> index(String username) {
		List<User> users = null;
		User user = userRepo.findByUsername(username);
		if (user != null && user.getRole().equalsIgnoreCase("admin")) {
			users = userRepo.findAll();
		}
		return users;
	}

	@Override
	public User show(String username, int uid) {
		User user = null;
		User adminUser = userRepo.findByUsername(username);

		if (!adminUser.getRole().equalsIgnoreCase("admin")) {
			user = new User();
			user.setId(-1);
			return user;
		}

		else {
			Optional<User> optUser = userRepo.findById(uid);
			if (optUser.isPresent()) {
				user = optUser.get();
			}
		}
		return user;
	}
	
	@Override
	public User update(String username, int uid, User user) {
		User requestingUser = userRepo.findByUsername(username);
		User dbUser = null;

		// Requesting user is either admin or updating own info:
		if (requestingUser != null
				&& (requestingUser.getRole().equalsIgnoreCase("admin") || requestingUser.getId() == uid)) {
			Optional<User> optDbUser = userRepo.findById(uid);
			if (optDbUser.isPresent()) {
				dbUser = optDbUser.get();
			} else {
				return null;
			}
			// Will not change any field to null if not provided.
			if (user.getEmail() != null) {
				dbUser.setEmail(user.getEmail());
			}
			if (user.getFirstName() != null) {
				dbUser.setFirstName(user.getFirstName());
			}
			if (user.getMiddleName() != null) {
				dbUser.setMiddleName(user.getMiddleName());
			}
			if (user.getLastName() != null) {
				dbUser.setLastName(user.getLastName());
			}
			if (user.getSuffix() != null) {
				dbUser.setSuffix(user.getSuffix());
			}
			if (user.getDob() != null) {
				dbUser.setDob(user.getDob());
			}
			if (user.getEnabled() != null) {
				dbUser.setEnabled(user.getEnabled());
			}
			// User with "user" role cannot change self to "admin":
			if (requestingUser.getRole().equalsIgnoreCase("admin")) {
				dbUser.setRole(user.getRole());
			}

			userRepo.saveAndFlush(dbUser);

		} else {
			User noAuthUser = new User();
			noAuthUser.setId(-1);
			return noAuthUser;
		}
		return dbUser;
	}

	@Override
	public int deactivate(String username, int uid) {
		User requestingUser = userRepo.findByUsername(username);
		User dbUser = null;
		if (requestingUser != null
				&& (requestingUser.getRole().equalsIgnoreCase("admin") || requestingUser.getId() == uid)) {
			Optional<User> optDbUser = userRepo.findById(uid);

			if (optDbUser.isPresent()) {
				dbUser = optDbUser.get();
				dbUser.setEnabled(false);
				userRepo.saveAndFlush(dbUser);
				return 204;
			} else {
				return 404;
			}
		} else {
			return 401;
		}
	}

	@Override
	public User showByUserName(String username) {
		return userRepo.findByUsername(username);
	}
}
