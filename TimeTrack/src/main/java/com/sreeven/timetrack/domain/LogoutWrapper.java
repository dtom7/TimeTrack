package com.sreeven.timetrack.domain;

public class LogoutWrapper {
	
	private boolean success;
	private String msg;
	public LogoutWrapper(boolean success, String msg) {
		super();
		this.success = success;
		this.msg = msg;
	}
	public LogoutWrapper() {
		super();
	}
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}

}
