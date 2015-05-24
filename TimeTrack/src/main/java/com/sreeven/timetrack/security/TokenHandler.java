package com.sreeven.timetrack.security;

import java.util.Date;

import com.sreeven.timetrack.domain.UserAuthToken;
import com.sreeven.timetrack.service.UserService;

import io.jsonwebtoken.Claims;
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
		/* The parser() method will throw exceptions if the token is tampered
		 * with or if the token has expired */	 
		try {
			Claims claims = Jwts.parser().setSigningKey(secret)
					.parseClaimsJws(token).getBody();
			String username = claims.getSubject();
			Date expDate = claims.getExpiration();
			/* Do not accept tokens with no expire date */
			if (expDate == null) {
				return null;
			}
			return userService.loadUserAuthToken(username);
		} catch (Exception ex) {
			System.out.println("Exception: " + ex.getMessage());
			return null;
		}
	}

	public String createTokenForUser(UserAuthToken user) {
		return Jwts.builder().setSubject(user.getUsername())
				.setId(Long.toString(user.getId()))
				.setExpiration(new Date(System.currentTimeMillis() + 1800000L))
				.signWith(SignatureAlgorithm.HS256, secret).compact();
	}
}
