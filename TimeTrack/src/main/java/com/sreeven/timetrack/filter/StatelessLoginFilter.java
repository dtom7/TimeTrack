package com.sreeven.timetrack.filter;

import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sreeven.timetrack.domain.LoginWrapper;
import com.sreeven.timetrack.domain.UserAuthToken;
import com.sreeven.timetrack.service.TokenAuthenticationService;
import com.sreeven.timetrack.service.UserService;

// This filter only responds to '/login' which is the defaultFilterProcessesUrl

public class StatelessLoginFilter extends
		AbstractAuthenticationProcessingFilter {

	private static final Logger logger = LoggerFactory
			.getLogger(StatelessLoginFilter.class);

	private final TokenAuthenticationService tokenAuthenticationService;
	private final UserService userService;

	protected StatelessLoginFilter(String defaultFilterProcessesUrl,
			TokenAuthenticationService tokenAuthenticationService,
			UserService userService) {
		super(defaultFilterProcessesUrl);
		super.setRequiresAuthenticationRequestMatcher(new AntPathRequestMatcher(
				defaultFilterProcessesUrl));
		this.tokenAuthenticationService = tokenAuthenticationService;
		this.userService = userService;
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request,
			HttpServletResponse response) throws AuthenticationException,
			IOException, ServletException {
		System.out.println("In attemptAuthentication - username: "
				+ request.getParameter("username") + " -- password: "
				+ request.getParameter("password") + " -- method: "
				+ request.getMethod());
		if (!request.getMethod().equals("POST")) {
			throw new AuthenticationServiceException(
					"Only POST requests are allowed");
		}
		UsernamePasswordAuthenticationToken loginToken = new UsernamePasswordAuthenticationToken(
				request.getParameter("username"),
				request.getParameter("password"));

		return getAuthenticationManager().authenticate(loginToken);

	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request,
			HttpServletResponse response, FilterChain chain,
			Authentication authentication) throws IOException, ServletException {
		System.out.println("In successfulAuthentication .. ");
		// Lookup the complete User object from the database and create an
		// Authentication for it
		final UserAuthToken authenticatedUser = userService
				.loadUserAuthToken(authentication.getName());

		// Add the custom token as HTTP header to the response
		tokenAuthenticationService.addAuthentication(response,
				authenticatedUser);

		// Add the authentication to the Security context
		SecurityContextHolder.getContext().setAuthentication(authenticatedUser);
		ObjectMapper mapper = new ObjectMapper();
		LoginWrapper wrapper = new LoginWrapper(true, "Login Success");
        OutputStream out = response.getOutputStream();
        mapper.writeValue(out, wrapper);
	}

	@Override
	protected void unsuccessfulAuthentication(HttpServletRequest request,
			HttpServletResponse response, AuthenticationException failed)
			throws IOException, javax.servlet.ServletException {
		System.out.println("In unsuccessfulAuthentication .. " + failed);
		/*response.sendError(HttpServletResponse.SC_BAD_REQUEST,
				failed.getMessage());*/
		ObjectMapper mapper = new ObjectMapper();
		LoginWrapper wrapper = new LoginWrapper(true, failed.getMessage());
        OutputStream out = response.getOutputStream();
        mapper.writeValue(out, wrapper);
	}

}
