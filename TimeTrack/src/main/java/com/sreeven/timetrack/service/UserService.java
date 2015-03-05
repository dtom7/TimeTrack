package com.sreeven.timetrack.service;

import java.util.List;

import com.sreeven.timetrack.domain.User;


public interface UserService {
	
	List<User> getAllUsers();
	User getUserById(Long id);
	User getUserByEmail(String email);
	Long createUser(User user);
	User updateUser(User user);
	void deleteUser(User user);

}
