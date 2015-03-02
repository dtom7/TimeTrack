package com.sreeven.timetrack.controller;

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
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sreeven.timetrack.domain.LoginWrapper;
import com.sreeven.timetrack.domain.LogoutWrapper;
import com.sreeven.timetrack.domain.User;
import com.sreeven.timetrack.domain.UserWrapper;

@RestController
public class LoginController {

	private static final Logger logger = LoggerFactory
			.getLogger(LoginController.class);

	@Autowired
	@Qualifier("authenticationManager")
	AuthenticationManager authenticationManager;

	@Autowired
	SecurityContextRepository repository;

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
			//repository.saveContext(SecurityContextHolder.getContext(), request,response);

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

		return new UserWrapper(true, new User("Samuel"));
	}

}
