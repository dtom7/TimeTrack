package com.sreeven.timetrack.domain;

import java.util.Collection;
import java.util.Date;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

public class UserAuthToken extends UsernamePasswordAuthenticationToken {
	
	private long id;
	private String username;
	private Date expiration;
	
	public UserAuthToken(Object principal, Object credentials,
			Collection<? extends GrantedAuthority> authorities, long id) {
		super(principal, credentials, authorities);
		this.id = id;
		this.username = (String) principal;
		this.expiration = new Date();
	}
	
	public long getId() {
		return id;
	}
	
	public void setId(long id) {
		this.id = id;
	}
	
	public String getUsername() {
		return username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}

	public Date getExpiration() {
		return expiration;
	}

	public void setExpiration(Date expiration) {
		this.expiration = expiration;
	}
	
}
