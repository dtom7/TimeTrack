package com.sreeven.timetrack.domain;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="CONSULTANT")
public class Consultant {
	
	@Id
	@GeneratedValue
	@Column(name = "ID")
    private long id;
	@Column(name = "NAME", nullable=false)
	private String name;
	@OneToOne(mappedBy="consultant", cascade=CascadeType.ALL) 
	private User user = null;
	
	public Consultant() {
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
}
