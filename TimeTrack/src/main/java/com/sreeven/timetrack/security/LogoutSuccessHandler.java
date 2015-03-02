package com.sreeven.timetrack.security;

import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.SimpleUrlLogoutSuccessHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sreeven.timetrack.domain.LogoutWrapper;

public class LogoutSuccessHandler extends SimpleUrlLogoutSuccessHandler {

	@Override
	public void onLogoutSuccess(HttpServletRequest request,
			HttpServletResponse response, Authentication authentication)
			throws IOException, ServletException {

		System.out.println("logout handler ..");
		ObjectMapper mapper = new ObjectMapper();
		LogoutWrapper wrapper = new LogoutWrapper(true, "Logout Success");
		OutputStream out;
		out = response.getOutputStream();
		mapper.writeValue(out, wrapper);

	}

}
