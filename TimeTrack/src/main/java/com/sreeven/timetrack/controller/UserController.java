package com.sreeven.timetrack.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.sreeven.timetrack.domain.Address;
import com.sreeven.timetrack.domain.AddressType;
import com.sreeven.timetrack.domain.Phone;
import com.sreeven.timetrack.domain.PhoneType;
import com.sreeven.timetrack.domain.Role;
import com.sreeven.timetrack.domain.User;
import com.sreeven.timetrack.domain.SingleUserRESTWrapper;
import com.sreeven.timetrack.service.UserService;

@RestController
@RequestMapping("/users")
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
			user.setPassword(new BCryptPasswordEncoder().encode("password" + i));
			user.setEnabled(true);
			user.getUserRoles().add(Role.ROLE_USER);
			user.getUserAddresses().add(
					new Address(AddressType.HOME, "123 Main St", "",
							"Columbus", "OH", "12345", "USA"));
			user.getUserAddresses().add(
					new Address(AddressType.WORK, "321 King St", "", "Troy",
							"NY", "98765", "USA"));
			user.getUserPhones().add(
					new Phone(PhoneType.HOME, "123-456-7899"));
			user.getUserPhones().add(
					new Phone(PhoneType.MOBILE, "987-654-3211"));
			System.out.println("Creating user: " + user);
			System.out.println("Created user: " + userService.createUser(user));
		}
		return count + " users created";
	}

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public List<User> getAllUsers() {
		System.out.println("getAllUsers ..");
		return userService.getAllUsers();
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public SingleUserRESTWrapper getUser(@PathVariable long id) {
		System.out.println("getUser: " + id);
		return new SingleUserRESTWrapper(true, userService.getUserById(id));
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public SingleUserRESTWrapper updateUser(@RequestBody SingleUserRESTWrapper userWrapper, @PathVariable long id) { //@RequestBody SingleUserRESTWrapper userWrapper,
		User user = userWrapper.getOriginalUser();
		System.out.println("updateUser: " + user);
		return new SingleUserRESTWrapper(true, userService.updateUser(user));
	}
	
/*	@RequestMapping(value = "/{id}", method = RequestMethod.POST)
	public long createUser(@RequestBody User user, @PathVariable long id) {
		System.out.println("createUser: " + user);
		return userService.createUser(user);
	    //StringBuilder buffer = new StringBuilder(); // HttpServletRequest request
	    //BufferedReader reader = request.getReader();
	    //String line;
	    //while ((line = reader.readLine()) != null) {
	    //    buffer.append(line);
	    //}
	    //String data = buffer.toString();
	}*/

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public String deleteUser(@RequestBody User user, @PathVariable long id) {
		System.out.println("deleteUser: " + id);
		userService.deleteUser(user);
		return "Deleted";
	}

}
