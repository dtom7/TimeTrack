package com.sreeven.timetrack.service;

import com.sreeven.timetrack.domain.User;


public interface UserService {
	
	User findUserByEmail(String email);

}
