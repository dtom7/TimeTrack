package com.sreeven.timetrack.service;

import java.util.List;

import com.sreeven.timetrack.domain.User;
import com.sreeven.timetrack.domain.UserAuthToken;


public interface UserService {
	
	UserAuthToken loadUserAuthToken(String email);
	List<User> getAllUsers();
	User getUserById(Long id);
	User getUserByEmail(String email);
	Long getUserIdByEmail(String email);
	Long createUser(User user);
	User updateUser(User user);
	void deleteUser(User user);
	void processResetPassword(String email);

}
