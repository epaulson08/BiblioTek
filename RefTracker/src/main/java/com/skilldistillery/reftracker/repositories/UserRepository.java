package com.skilldistillery.reftracker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.reftracker.entities.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	User findByUsername (String username);
}
