package com.sreeven.timetrack.domain;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class Phone {

	@Column(name = "PHONE_TYPE", nullable = false)
	private PhoneType phoneType;
	@Column(name = "PHONE_NUMBER")
	private String phoneNumber;

	public Phone() {
		super();
	}

	public Phone(PhoneType phoneType, String phoneNumber) {
		super();
		this.phoneType = phoneType;
		this.phoneNumber = phoneNumber;
	}

	public PhoneType getPhoneType() {
		return phoneType;
	}

	public void setPhoneType(PhoneType phoneType) {
		this.phoneType = phoneType;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

}
