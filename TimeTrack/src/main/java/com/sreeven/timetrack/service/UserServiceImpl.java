package com.sreeven.timetrack.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sreeven.timetrack.dao.UserDAO;
import com.sreeven.timetrack.domain.Role;
import com.sreeven.timetrack.domain.User;
import com.sreeven.timetrack.domain.UserAuthToken;

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

	@Override
	@Transactional
	public UserAuthToken loadUserAuthToken(String email) {
		User user = this.getUserByEmail(email);
		List<GrantedAuthority> grantedAuths = new ArrayList<>();
		for (Role role : user.getUserRoles()) {
			grantedAuths.add(new SimpleGrantedAuthority(role.name()));
		}
		return new UserAuthToken(user.getEmail(), null, grantedAuths,
				user.getId());
	}

}
