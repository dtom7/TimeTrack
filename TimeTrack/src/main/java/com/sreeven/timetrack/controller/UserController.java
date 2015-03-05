package com.sreeven.timetrack.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sreeven.timetrack.domain.User;
import com.sreeven.timetrack.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userService;

	@RequestMapping("/createUsers/{count}")
	public boolean createUsers(@PathVariable int count) {
		System.out.println("Count is: " + count);
		for (int i = 1; i <= count; i++) {
			User user = new User();
			user.setEmail("user" + i + "@example.com");
			user.setName("user" + i);
			user.setPassword("password" + i);
			user.setStatus("A");
			System.out.println("Creating user: " + user);
			try {
				System.out.println("Created user: "
						+ userService.createUser(user));
			} catch (Exception ex) {
				System.out.println(ex);
			}
		}
		return true;
	}
	
	@RequestMapping("/getAllUsers")
	public List<User> getAllUsers() {
		return userService.getAllUsers();
	}

}
