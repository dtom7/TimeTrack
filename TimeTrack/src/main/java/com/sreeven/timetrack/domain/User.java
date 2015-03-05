package com.sreeven.timetrack.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Version;


@Entity
@Table(name="USER_TBL")
public class User {
	
	@Id
	@GeneratedValue
	@Column(name = "ID")
    private long id;
	@Column(name = "EMAIL", unique = true, nullable=false)
	private String email;
	@Column(name = "PASSWORD", nullable=false)
	private String password;
	@Column(name = "STATUS", nullable=false, length=1)
	private String status;
	@Column(name = "NAME", nullable=false)
	private String name;
	@Version 
	private long version;
	
	public User() {
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public long getVersion() {
		return version;
	}

	public void setVersion(long version) {
		this.version = version;
	}
	
	@Override
	public String toString() {
		return this.id + " -- " + this.email + " -- " + this.name;
	}
	
}
