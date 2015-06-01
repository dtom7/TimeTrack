package com.sreeven.timetrack.exception;

public class NoUserExistsException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	
	public NoUserExistsException(String message) {
		super(message);
	}

}
