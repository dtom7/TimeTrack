package com.sreeven.timetrack.security;

import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sreeven.timetrack.domain.LoginWrapper;


public class LoginSuccessHandler implements AuthenticationSuccessHandler {
	
	private static final Logger logger = LoggerFactory
			.getLogger(LoginSuccessHandler.class);
	
	static {
		System.out.println("In LoginSuccessHandler ..");
	}

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request,
            HttpServletResponse response, Authentication auth) throws IOException,
			ServletException {
		System.out.println("onAuthenticationSuccess ..");
		ObjectMapper mapper = new ObjectMapper();
		LoginWrapper wrapper = new LoginWrapper(true, "Login Success");
        OutputStream out = response.getOutputStream();
        mapper.writeValue(out, wrapper);
		
	}

}
