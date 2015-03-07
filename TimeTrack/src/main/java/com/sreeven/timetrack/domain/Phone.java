package com.sreeven.timetrack.domain;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Embeddable
public class Phone {

	@Column(name = "PHONE_TYPE")
	@Enumerated(EnumType.STRING)
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
	
	@Override
	public boolean equals(Object obj) {
		if (obj == null) {
			return false;
		}
		if (obj == this) {
			return true;
		}
		if (obj.getClass() != getClass()) {
			return false;
		}
		Phone rhs = (Phone) obj;
		return Objects.equals(phoneType, rhs.phoneType)
				&& Objects.equals(phoneNumber, rhs.phoneNumber);
	}

	@Override
	public int hashCode() {
		return Objects.hash(phoneType, phoneNumber);
	}

}
