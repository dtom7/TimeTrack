package com.sreeven.timetrack.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sreeven.timetrack.dao.UserDAO;
import com.sreeven.timetrack.domain.User;

@Service("userServiceImpl")
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserDAO userDAO;

	@Override
	@Transactional
	public List<User> getAllUsers() {
		return userDAO.getAllUsers();
	}

	@Override
	@Transactional
	public User getUserById(Long id) {
		return userDAO.getUserById(id);
	}

	@Override
	@Transactional
	public User getUserByEmail(String email) {
		return userDAO.getUserByEmail(email);
	}

	@Override
	@Transactional
	public Long createUser(User user) {
		return userDAO.createUser(user);
	}

	@Override
	@Transactional
	public User updateUser(User user) {
		return userDAO.updateUser(user);
	}

	@Override
	@Transactional
	public void deleteUser(User user) {
		userDAO.deleteUser(user);		
	}

}
