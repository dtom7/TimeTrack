package com.sreeven.timetrack.dao;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sreeven.timetrack.domain.User;

@Repository("userDAOImpl")
public class UserDAOImpl implements UserDAO {

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public User getUserByEmail(String email) {
		return null;
	}

	@Override
	public Long createUser(User user) {
		Long id = (Long) sessionFactory.getCurrentSession().save(user);
		return id;
	}

	@Override
	public User updateUser(User user) {
		User obj = (User) sessionFactory.getCurrentSession().merge(user);
		return obj;
	}

	@Override
	public User getUserById(Long id) {
		User user = (User) sessionFactory.getCurrentSession().get(User.class,
				id);
		return user;
	}

	@Override
	public void deleteUser(User user) {
		sessionFactory.getCurrentSession().delete(user);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<User> getAllUsers() {
		Query query = sessionFactory.getCurrentSession().createQuery(
				"from User");
		List<User> list = (List<User>) query.list();
		return list;
	}

}
