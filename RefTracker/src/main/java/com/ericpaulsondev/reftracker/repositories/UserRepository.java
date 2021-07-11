package com.ericpaulsondev.reftracker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ericpaulsondev.reftracker.entities.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	User findByUsername (String username);
}
