package com.ericpaulsondev.reftracker.util;

import java.security.Principal;

import com.ericpaulsondev.reftracker.entities.JournalArticle;
import com.ericpaulsondev.reftracker.entities.MyCollection;
import com.ericpaulsondev.reftracker.entities.User;
import com.ericpaulsondev.reftracker.services.JournalArticleService;
import com.ericpaulsondev.reftracker.services.MyCollectionService;
import com.ericpaulsondev.reftracker.services.UserService;

public class UtilCheckUserAccess {
	
	public static boolean isAdmin(Principal principal, UserService userServ) {
		try {
			boolean isAdmin = userServ.showByUserName(principal.getName()).getRole().equals("admin");
			return isAdmin;
		} catch (NullPointerException npe) {
			npe.printStackTrace();
			return false;
		}
	}
	public static boolean myCollectionBelongsToPrincipal(Integer myCollId, Principal principal, UserService userServ, MyCollectionService collServ) {
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

	public static boolean journalArticleBelongsToPrincipal(Integer journalArticleId, Principal principal, UserService userServ, JournalArticleService jaServ) {
		try {
			User user = userServ.showByUserName(principal.getName());
			JournalArticle managedJa = jaServ.findById(journalArticleId);
			if (managedJa.getUsers().contains(user))
				return true;
			return false;
		} catch (NullPointerException npe) {
			npe.printStackTrace();
			return false;
		}
	}
}
