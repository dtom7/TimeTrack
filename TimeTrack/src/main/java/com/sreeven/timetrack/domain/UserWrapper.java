package com.sreeven.timetrack.domain;

import java.util.Set;

public class UserWrapper {
	
	private boolean success;
	private UserInfo user;
	public UserWrapper(boolean success, User user) {
		super();
		this.success = success;
		this.user = new UserInfo(user.getId(), user.getEmail(), user.getUserRoles());
	}
	public UserWrapper() {
	}
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public UserInfo getUserInfo() {
		return user;
	}
	public void setUserInfo(UserInfo user) {
		this.user = user;
	}
	
	private static class UserInfo {
		private long id;
		private String email;
		private Set<Role> userRoles;
		public UserInfo() {
		}
		public UserInfo(long id, String email, Set<Role> userRoles) {
			this.id = id;
			this.email = email;
			this.userRoles = userRoles;
		}
		public long getId() {
			return id;
		}
		public void setId(long id) {
			this.id = id;
		}
		public String getEmail() {
			return email;
		}
		public void setEmail(String email) {
			this.email = email;
		}
		public Set<Role> getUserRoles() {
			return userRoles;
		}
		public void setUserRoles(Set<Role> userRoles) {
			this.userRoles = userRoles;
		}
		
	}
	
}
