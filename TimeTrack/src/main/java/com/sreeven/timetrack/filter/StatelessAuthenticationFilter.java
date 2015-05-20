package com.sreeven.timetrack.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import com.sreeven.timetrack.service.TokenAuthenticationService;

public class StatelessAuthenticationFilter extends GenericFilterBean {

	private final TokenAuthenticationService tokenAuthenticationService;

	protected StatelessAuthenticationFilter(
			TokenAuthenticationService tokenAuthenticationService) {
		this.tokenAuthenticationService = tokenAuthenticationService;
		System.out.println("StatelessAuthenticationFilter ..");
	}

	@Override
	public void doFilter(ServletRequest req, ServletResponse res,
			FilterChain chain) throws IOException, ServletException {
		System.out.println("StatelessAuthenticationFilter .. doFilter");
		Authentication auth = tokenAuthenticationService
				.getAuthentication((HttpServletRequest) req);
		// Add auth header (X-AUTH-TOKEN) with extended exp (+30 mins) if the
		// response
		// doesn't already contain an auth header. The auth header may be added
		// by
		// StatelessLoginFilter upon successful authentication. In that case no
		// need to add auth header again.
		if (auth != null
				&& !((HttpServletResponse) res)
						.containsHeader(TokenAuthenticationService.AUTH_HEADER_NAME)) {
			tokenAuthenticationService.addAuthentication(
					(HttpServletResponse) res, auth);
		}
		// Add the authentication to SecurityContextHolder on the way in
		SecurityContextHolder.getContext().setAuthentication(auth);
		chain.doFilter(req, res); // always continue
		// Remove the authentication from SecurityContextHolder on the way out
		SecurityContextHolder.getContext().setAuthentication(null);
	}
}
