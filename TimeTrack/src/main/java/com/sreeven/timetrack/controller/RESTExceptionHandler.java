package com.sreeven.timetrack.controller;


import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.sreeven.timetrack.domain.RESTExceptionWrapper;
import com.sreeven.timetrack.exception.NoUserExistsException;

@ControllerAdvice
public class RESTExceptionHandler extends ResponseEntityExceptionHandler {

	@ExceptionHandler(NoUserExistsException.class)
	protected ResponseEntity<Object> handleNotFound(RuntimeException e,
			WebRequest request) {
		
		System.out.println("RESTExceptionHandler.handleNotFound: " + e);
		e.printStackTrace();
		
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		return handleExceptionInternal(e,
				new RESTExceptionWrapper(false, e.getMessage()), headers,
				HttpStatus.NOT_FOUND, request);
	}

	@ExceptionHandler({ Exception.class })
	protected ResponseEntity<Object> handleInvalidRequest(RuntimeException e,
			WebRequest request) {

		System.out.println("RESTExceptionHandler.handleInvalidRequest: " + e);
		e.printStackTrace();

		String retString = "Internal Exception";

		switch (e.getClass().getName()) {

		case "org.springframework.orm.hibernate4.HibernateOptimisticLockingFailureException":
			retString = "Concurrent modification detected .. \r\nRefresh the browser and try again ..";
			break;
		case "org.springframework.dao.DataIntegrityViolationException":
			retString = "Data integrity violation exception !!";
			break;
		default:
			retString = "Other Exception -- " + e.getMessage();
			break;

		}

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		return handleExceptionInternal(e, new RESTExceptionWrapper(false,
				retString), headers, HttpStatus.OK, request);
	}

}
