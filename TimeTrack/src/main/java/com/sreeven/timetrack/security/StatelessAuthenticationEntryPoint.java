package com.sreeven.timetrack.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

public class StatelessAuthenticationEntryPoint implements
		AuthenticationEntryPoint {
	
	private static final Logger logger = LoggerFactory
			.getLogger(StatelessAuthenticationEntryPoint.class);
	
	@Override
	public void commence(HttpServletRequest request,
			HttpServletResponse response, AuthenticationException authException)
			throws IOException, ServletException {
		logger.info("In commence ..");
		
		response.sendError(HttpServletResponse.SC_UNAUTHORIZED,
				"Unauthorized: Authentication token was either missing or invalid.");
	}
}
