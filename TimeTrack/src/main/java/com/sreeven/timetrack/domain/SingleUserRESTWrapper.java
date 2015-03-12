package com.sreeven.timetrack.domain;

public class SingleUserRESTWrapper {
	
	private boolean success;
	private User data;
	public SingleUserRESTWrapper() {
	}
	public SingleUserRESTWrapper(boolean success, User data) {
		super();
		this.success = success;
		this.data = data;
	}
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public User getData() {
		return data;
	}
	public void setData(User data) {
		this.data = data;
	}
	
}
