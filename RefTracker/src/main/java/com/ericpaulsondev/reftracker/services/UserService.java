package com.ericpaulsondev.reftracker.services;

import java.util.List;

import com.ericpaulsondev.reftracker.entities.MyCollection;
import com.ericpaulsondev.reftracker.entities.User;

public interface UserService {

	public List<User> index(String username);
	
	public User show(int uid);

	public User show(String username, int uid);
	
	public User showByUserName(String username);

	// CREATE functionality will be handled in the AuthService.
//	public User create(String username, User user);
	
	public User addMyCollection(int userId, MyCollection coll);

	public User update(String username, int uid, User user);

	public int deactivate(String username, int uid);

	public boolean hardDelete(String username);
}
