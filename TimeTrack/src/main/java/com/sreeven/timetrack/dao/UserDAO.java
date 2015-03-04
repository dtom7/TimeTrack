package com.sreeven.timetrack.dao;

import com.sreeven.timetrack.domain.User;

public interface UserDAO {
	
	User findUserByEmail(String email);

}
