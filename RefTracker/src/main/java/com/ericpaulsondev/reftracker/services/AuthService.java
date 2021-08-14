package com.ericpaulsondev.reftracker.services;

import java.security.Principal;

import com.ericpaulsondev.reftracker.entities.User;

public interface AuthService {
	
	public User register(User user);

	public boolean isAdmin(Principal principal);

	public boolean myCollectionBelongsToPrincipal(Integer myCollId, Principal principal);
	
	public boolean journalArticleBelongsToPrincipal(Integer journalArticleId, Principal principal);

}
