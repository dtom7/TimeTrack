package com.sreeven.timetrack.domain;

public class ResetPasswordJSONWrapper {

	private String message;

	public ResetPasswordJSONWrapper() {
		super();
	}

	public ResetPasswordJSONWrapper(String message) {
		super();
		this.message = message;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}
