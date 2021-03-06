package com.sreeven.timetrack.controller;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sreeven.timetrack.domain.LinkWrapper;
import com.sreeven.timetrack.domain.LoginWrapper;
import com.sreeven.timetrack.domain.LogoutWrapper;
import com.sreeven.timetrack.domain.ResetPasswordJSONWrapper;
import com.sreeven.timetrack.domain.Role;
import com.sreeven.timetrack.domain.SingleUserRESTWrapper;
import com.sreeven.timetrack.domain.User;
import com.sreeven.timetrack.domain.UserWrapper;
import com.sreeven.timetrack.service.UserService;

@RestController
public class LoginController {

	private static final Logger logger = LoggerFactory
			.getLogger(LoginController.class);

	@Autowired
	@Qualifier("authenticationManager")
	private AuthenticationManager authenticationManager;

	@Autowired
	private SecurityContextRepository repository;

	@Autowired
	private UserService userService;

	@PostConstruct
	public void setupAdminUser() {
		System.out.println("Post construct: " + userService);
		User user = new User();
		user.setEmail("admin@example.com");
		user.setName("Administrator");
		String password = "admin";
		user.setPassword(new BCryptPasswordEncoder().encode(password));
		user.setEnabled(true);
		user.getUserRoles().add(Role.ROLE_USER);
		user.getUserRoles().add(Role.ROLE_ADMIN);
		System.out.println("Created admin user: "
				+ userService.createUser(user));
	}

	@RequestMapping(value = "/processLogin", method = RequestMethod.POST)
	public LoginWrapper processLogin(
			@RequestParam(value = "userId") String userId,
			@RequestParam(value = "password") String password,
			HttpServletRequest request, HttpServletResponse response) {
		System.out.println("userid: " + userId + " & password: " + password);
		UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
				userId, password);
		try {
			Authentication auth = authenticationManager.authenticate(token);
			SecurityContextHolder.getContext().setAuthentication(auth);
			// repository.saveContext(SecurityContextHolder.getContext(),
			// request,response);

			return new LoginWrapper(true, "Login Success");
		} catch (BadCredentialsException ex) {
			return new LoginWrapper(true, "Bad Credentials");
		}

	}

	@RequestMapping(value = "/processLogout")
	public LogoutWrapper processLogout() {
		System.out.println("Logout called ");

		return new LogoutWrapper(true, "Logout Success");
	}

	@RequestMapping("/getUser")
	public UserWrapper getUser() {
		Authentication auth = SecurityContextHolder.getContext()
				.getAuthentication();
		return new UserWrapper(true, userService.getUserByEmail(auth.getName()));
	}

	@RequestMapping("/getLinks")
	public LinkWrapper getLinks() {
		Authentication auth = SecurityContextHolder.getContext()
				.getAuthentication();
		return new LinkWrapper(true, userService.getUserByEmail(auth.getName()));
	}

	@RequestMapping(value = "/processResetPassword", method = RequestMethod.POST)
	public ResetPasswordJSONWrapper processResetPassword(
			@RequestBody ResetPasswordJSONWrapper request) {
		userService.processResetPassword(request.getMessage());
		return new ResetPasswordJSONWrapper("An email has been sent to "
				+ request.getMessage()
				+ " with instructions to reset the password.");
	}

}
