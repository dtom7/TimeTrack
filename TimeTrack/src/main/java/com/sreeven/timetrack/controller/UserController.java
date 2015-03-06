package com.sreeven.timetrack.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sreeven.timetrack.domain.Address;
import com.sreeven.timetrack.domain.AddressType;
import com.sreeven.timetrack.domain.Phone;
import com.sreeven.timetrack.domain.PhoneType;
import com.sreeven.timetrack.domain.Role;
import com.sreeven.timetrack.domain.User;
import com.sreeven.timetrack.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userService;

	@RequestMapping("/createUsers/{count}")
	public String createUsers(@PathVariable int count) {
		System.out.println("Count is: " + count);
		for (int i = 1; i <= count; i++) {
			User user = new User();
			user.setEmail("user" + i + "@example.com");
			user.setName("user" + i);
			user.setPassword("password" + i);
			user.setStatus("A");
			user.getUserRoles().add(Role.ROLE_USER);
			if (i == 1) {
				user.getUserRoles().add(Role.ROLE_ADMIN);
			}
			user.getUserAddresses().add(new Address(AddressType.HOME, "123 Main St", "", "Columbus", "OH", "12345", "USA"));
			user.getUserAddresses().add(new Address(AddressType.WORK, "321 King St", "", "Troy", "NY", "98765", "USA"));
			user.getUserPhones().add(new Phone(PhoneType.HOME_PHONE, "123-456-7899"));
			user.getUserPhones().add(new Phone(PhoneType.MOBILE_PHONE, "987-654-3211"));
			System.out.println("Creating user: " + user);
				System.out.println("Created user: "
						+ userService.createUser(user));
		}
		return count + " users created";
	}

	@RequestMapping("/getAllUsers")
	public List<User> getAllUsers() {
		return userService.getAllUsers();
	}

	@RequestMapping("/updateUser/{id}/{name}")
	public String updateUser(@PathVariable long id, @PathVariable String name) {
		User user = userService.getUserById(id);
		user.setName(name);
		return userService.updateUser(user).getName();

	}
	
	@RequestMapping("/deleteUser/{id}")
	public String deleteUser(@PathVariable long id) {
		User user = userService.getUserById(id);
		System.out.println("User: " + user + " will be deleted");
		userService.deleteUser(user);
		return "Deleted";
	}

		

}
