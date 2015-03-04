package com.sreeven.timetrack.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Version;


@Entity
@Table(name="USER_ACCOUNT")
public class User {
	
	@Id
	@GeneratedValue
	@Column(name = "ID")
    private long id;
	@Column(name = "EMAIL", unique = true, nullable=false)
	private String email;
	@Column(name = "PASSWORD", nullable=false)
	private String password;
	@Column(name = "LOCKED", nullable=false, length=1)
	private String locked;
    @OneToOne
    @JoinColumn(name="CONSULTANT_ID")  
    private Consultant consultant = null;
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

	public String getLocked() {
		return locked;
	}

	public void setLocked(String locked) {
		this.locked = locked;
	}

	public long getVersion() {
		return version;
	}

	public void setVersion(long version) {
		this.version = version;
	}	
	
}
