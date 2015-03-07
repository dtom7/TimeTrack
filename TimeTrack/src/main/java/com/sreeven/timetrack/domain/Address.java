package com.sreeven.timetrack.domain;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Embeddable
public class Address {

	@Column(name = "ADDRESS_TYPE")
	@Enumerated(EnumType.STRING)
	private AddressType addressType;
	@Column(name = "ADDRESS1")
	private String address1;
	@Column(name = "ADDRESS2")
	private String address2;
	@Column(name = "CITY")
	private String city;
	@Column(name = "STATE")
	private String state;
	@Column(name = "ZIP_CODE")
	private String zipCode;
	@Column(name = "COUNTRY")
	private String country;

	public Address() {
		super();
	}

	public Address(AddressType addressType, String address1, String address2,
			String city, String state, String zipCode, String country) {
		super();
		this.addressType = addressType;
		this.address1 = address1;
		this.address2 = address2;
		this.city = city;
		this.state = state;
		this.zipCode = zipCode;
		this.country = country;
	}

	public AddressType getAddressType() {
		return addressType;
	}

	public void setAddressType(AddressType addressType) {
		this.addressType = addressType;
	}

	public String getAddress1() {
		return address1;
	}

	public void setAddress1(String address1) {
		this.address1 = address1;
	}

	public String getAddress2() {
		return address2;
	}

	public void setAddress2(String address2) {
		this.address2 = address2;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getZipCode() {
		return zipCode;
	}

	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
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
		Address rhs = (Address) obj;
		return Objects.equals(addressType, rhs.addressType)
				&& Objects.equals(address1, rhs.address1)
				&& Objects.equals(address2, rhs.address2)
				&& Objects.equals(city, rhs.city)
				&& Objects.equals(state, rhs.state)
				&& Objects.equals(zipCode, rhs.zipCode)
				&& Objects.equals(country, rhs.country);
	}

	@Override
	public int hashCode() {
		return Objects.hash(addressType, address1, address2, city, state,
				zipCode, country);
	}	
	
}
