package com.skilldistillery.reftracker.services;

import java.util.List;

import com.skilldistillery.reftracker.entities.User;

public interface UserService {

	public List<User> index(String username);

	public User show(String username, int uid);
	
	public User showByUserName(String username);

	public User create(String username, User user);

	public User update(String username, int uid, User user);

	public int deactivate(String username, int uid);

}
