package com.sreeven.timetrack.domain;

public class RESTExceptionWrapper {
	
	private boolean success;
	private String message;
	
	public RESTExceptionWrapper(boolean success, String message) {
		super();
		this.success = success;
		this.message = message;
	}
	
	public RESTExceptionWrapper() {
	}
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}	

}
