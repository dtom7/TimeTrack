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
		Query query = sessionFactory.getCurrentSession().createQuery(
				"from User u where u.email = :email_id");
		query.setParameter("email_id", email);
		@SuppressWarnings("unchecked")
		List<User> list = (List<User>) query.list();
		if (list.size() != 0) {
			return list.get(0);
		} else {
			User user = new User();
			user.setName("Test User");
			return user;
		}
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

	@Override
	public List<User> getAllUsers() {
		Query query = sessionFactory.getCurrentSession().createQuery(
				"from User");
		@SuppressWarnings("unchecked")
		List<User> list = (List<User>) query.list();
		return list;
	}

}
