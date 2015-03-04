package com.sreeven.timetrack.dao;

import org.springframework.stereotype.Service;

import com.sreeven.timetrack.domain.User;

@Service
public class UserDAOImpl implements UserDAO {

	@Override
	public User findUserByEmail(String email) {
		return null;
	}

}
