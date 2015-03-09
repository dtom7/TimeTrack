package com.sreeven.timetrack.security;

import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sreeven.timetrack.domain.LoginWrapper;


public class LoginFailureHandler implements AuthenticationFailureHandler {
	
	private static final Logger logger = LoggerFactory
			.getLogger(LoginFailureHandler.class);
	
	static {
		System.out.println("In LoginFailureHandler ..");
	}

	@Override
	public void onAuthenticationFailure(HttpServletRequest request,
            HttpServletResponse response, AuthenticationException auth)
			throws IOException, ServletException {
		System.out.println("onAuthenticationFailure ..");
		ObjectMapper mapper = new ObjectMapper();
		LoginWrapper wrapper = new LoginWrapper(true, "Bad Credentials");
        OutputStream out = response.getOutputStream();
        mapper.writeValue(out, wrapper);
		
	}

}
