package com.sreeven.timetrack.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class RESTExceptionHandler extends ResponseEntityExceptionHandler {

	@ExceptionHandler({ Exception.class })
	protected ResponseEntity<Object> handleInvalidRequest(RuntimeException e,
			WebRequest request) {

		String retString = "Internal Exception";

		switch (e.getClass().getName()) {

		case "org.springframework.orm.hibernate4.HibernateOptimisticLockingFailureException":
			retString = "Concurrent modification exception !!";
			break;
		case "org.springframework.dao.DataIntegrityViolationException":
			retString = "Data integrity violation exception !!";
			break;
		default:
			retString = "Other Exception -- " + e.getClass().getName();
			break;

		}

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		return handleExceptionInternal(e, retString, headers, HttpStatus.OK,
				request);
	}

}
