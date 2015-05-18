package com.sreeven.timetrack.security;

import com.sreeven.timetrack.domain.UserAuthToken;
import com.sreeven.timetrack.service.UserService;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public final class TokenHandler {

	private final String secret;
	private final UserService userService;

	public TokenHandler(String secret, UserService userService) {
		this.secret = secret;
		this.userService = userService;
	}

	public UserAuthToken parseUserFromToken(String token) {
		System.out.println("TokenHandler .. parseUserFromToken");
		String username = Jwts.parser().setSigningKey(secret)
				.parseClaimsJws(token).getBody().getSubject();
		return userService.loadUserAuthToken(username);
	}

	public String createTokenForUser(UserAuthToken user) {
		return Jwts.builder().setSubject(user.getUsername())
				.setId(Long.toString(user.getId()))
				.signWith(SignatureAlgorithm.HS256, secret).compact();
	}
}
