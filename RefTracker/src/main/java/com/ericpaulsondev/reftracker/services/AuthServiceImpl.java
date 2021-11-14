package com.ericpaulsondev.reftracker.services;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ericpaulsondev.reftracker.entities.JournalArticle;
import com.ericpaulsondev.reftracker.entities.MyCollection;
import com.ericpaulsondev.reftracker.entities.User;
import com.ericpaulsondev.reftracker.repositories.UserRepository;

@Service
public class AuthServiceImpl implements AuthService {

	@Autowired
	private PasswordEncoder encoder;

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private UserService userServ;

	@Autowired
	private MyCollectionService collServ;

	@Autowired
	private JournalArticleService jaServ;

	@Override
	public User register(User user) {
		String encodedPW = encoder.encode(user.getPassword());
		user.setPassword(encodedPW);
		user.setRole("user");
		user.setEnabled(true);

		userRepo.saveAndFlush(user);
		return user;
	}

	public boolean isAdmin(Principal principal) {
		try {
			boolean isAdmin = userServ.showByUserName(principal.getName()).getRole().equals("admin");
			return isAdmin;
		} catch (NullPointerException npe) {
			npe.printStackTrace();
			return false;
		}
	}

	public boolean myCollectionBelongsToPrincipal(Integer myCollId, Principal principal) {
		try {
			User user = userServ.showByUserName(principal.getName());
			MyCollection managedMyColl = collServ.findById(myCollId);
			if (managedMyColl.getUser().equals(user))
				return true;
			return false;
		} catch (NullPointerException npe) {
			npe.printStackTrace();
			return false;
		}
	}

	public boolean journalArticleBelongsToPrincipal(Integer journalArticleId, Principal principal) {
		User user = userServ.showByUserName(principal.getName());
		JournalArticle managedJa = jaServ.findById(journalArticleId);
		if (managedJa == null) {
			return false;
		}
		if (managedJa.getUsers().contains(user))
			return true;
		return false;
	}

}
