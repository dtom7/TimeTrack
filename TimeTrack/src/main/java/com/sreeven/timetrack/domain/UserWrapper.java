package com.sreeven.timetrack.domain;

public class UserWrapper {
	
	private boolean success;
	private User user;
	public UserWrapper(boolean success, User user) {
		super();
		this.success = success;
		this.user = user;
	}
	public UserWrapper() {
		super();
		// TODO Auto-generated constructor stub
	}
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	
}
