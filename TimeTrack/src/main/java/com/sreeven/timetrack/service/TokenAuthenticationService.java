package com.sreeven.timetrack.service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;

import com.sreeven.timetrack.domain.UserAuthToken;
import com.sreeven.timetrack.security.TokenHandler;

public class TokenAuthenticationService {
	 
    public static final String AUTH_HEADER_NAME = "X-AUTH-TOKEN";
 
    private final TokenHandler tokenHandler;
 
    public TokenAuthenticationService(String secret, UserService userService) {
        tokenHandler = new TokenHandler(secret, userService);
    }
 
    public void addAuthentication(HttpServletResponse response, Authentication authentication) {
        final UserAuthToken user = (UserAuthToken)authentication;
        response.addHeader(AUTH_HEADER_NAME, tokenHandler.createTokenForUser(user));
    }
 
    public Authentication getAuthentication(HttpServletRequest request) {
    	System.out.println("TokenAuthenticationService .. getAuthentication");
        final String token = request.getHeader(AUTH_HEADER_NAME);
        System.out.println("getAuthentication token: " + token);
        if (token != null) {
            final UserAuthToken user = tokenHandler.parseUserFromToken(token);
            if (user != null) {
                return user;
            }
        }
        return null;
    }
}
