package com.ericpaulsondev.reftracker.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ericpaulsondev.reftracker.entities.User;
import com.ericpaulsondev.reftracker.repositories.UserRepository;

@Service
public class AuthServiceImpl implements AuthService {
	
	@Autowired
	private PasswordEncoder encoder;
	
	@Autowired
	private UserRepository userRepo;

	@Override
	public User register(User user) {
		String encodedPW = encoder.encode(user.getPassword());
		user.setPassword(encodedPW);
		user.setRole("user");
		user.setEnabled(true);

		userRepo.saveAndFlush(user);
		return user;
	}

}
