package com.sreeven.timetrack.dao;

import java.util.List;
import java.util.Objects;

import org.hibernate.Hibernate;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.sreeven.timetrack.domain.User;
import com.sreeven.timetrack.exception.NoUserExistsException;

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
		if (list.size() == 0) {
			throw new NoUserExistsException("No User exists with the email: "
					+ email);
		}
		return list.get(0);
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
		Query query = sessionFactory.getCurrentSession().createQuery(
				"from User u where u.id = :user_id");
		query.setParameter("user_id", id);
		@SuppressWarnings("unchecked")
		List<User> list = (List<User>) query.list();
		User user = null;
		if (list.size() != 0) {
			user = list.get(0);
			/* to prevent lazy initialization exception */
			// Hibernate.initialize(user.getUserRoles());
			// Hibernate.initialize(user.getUserAddresses());
			// Hibernate.initialize(user.getUserPhones());
		}
		return Objects.requireNonNull(user, "No user exists with id: " + id);
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
