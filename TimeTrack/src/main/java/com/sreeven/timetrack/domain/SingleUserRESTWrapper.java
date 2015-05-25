package com.sreeven.timetrack.domain;

import java.util.HashSet;
import java.util.Set;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class SingleUserRESTWrapper {

	private boolean success;
	private UserInfo data;

	public SingleUserRESTWrapper() {
	}

	public SingleUserRESTWrapper(boolean success, User user) {
		super();
		this.success = success;
		this.data = new UserInfo(user);
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public UserInfo getData() {
		return data;
	}

	public void setData(UserInfo data) {
		this.data = data;
	}

	@JsonIgnore
	public User getOriginalUser() {
		User user = new User();
		user.setId(this.data.getId());
		user.setEmail(this.data.getEmail());
		if (this.data.getPassword().equals(this.data.getCnfrmPassword())) {
			user.setPassword(new BCryptPasswordEncoder().encode(this.data
					.getPassword()));
		} else {
			user.setPassword(this.data.getPassword());
		}
		user.setEnabled(this.data.isEnabled());
		user.setName(this.data.getName());
		user.setUserRoles(SingleUserRESTWrapper.getRoles(this.data
				.getUserRoles()));
		user.setUserAddresses(this.data.getUserAddresses());
		user.setUserPhones(this.data.getUserPhones());
		user.setVersion(this.data.getVersion());
		return user;
	}

	public static Set<UserRole> getUserRoles(Set<Role> roles) {
		Set<UserRole> userRoles = new HashSet<>();
		for (Role role : Role.values()) {
			userRoles.add(new UserRole(role, roles.contains(role)));
		}
		return userRoles;
	}

	public static Set<Role> getRoles(Set<UserRole> userRoles) {
		Set<Role> roles = new HashSet<>();
		for (UserRole userRole : userRoles) {
			if (userRole.isSelected()) {
				roles.add(userRole.getRole());
			}
		}
		return roles;
	}

	public static class UserInfo {

		private long id;
		private String email;
		private String password;
		private String cnfrmPassword;
		private boolean enabled;
		private String name;
		private Set<UserRole> userRoles = new HashSet<UserRole>();
		private Set<Address> userAddresses = new HashSet<Address>();
		private Set<Phone> userPhones = new HashSet<Phone>();
		private long version;

		public UserInfo() {
			super();
		}

		UserInfo(User user) {
			this.id = user.getId();
			this.email = user.getEmail();
			this.password = user.getPassword();
			this.enabled = user.isEnabled();
			this.name = user.getName();
			this.userRoles = SingleUserRESTWrapper.getUserRoles(user
					.getUserRoles());
			this.userAddresses = user.getUserAddresses();
			this.userPhones = user.getUserPhones();
			this.version = user.getVersion();
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

		public String getCnfrmPassword() {
			return cnfrmPassword;
		}

		public void setCnfrmPassword(String cnfrmPassword) {
			this.cnfrmPassword = cnfrmPassword;
		}

		public boolean isEnabled() {
			return enabled;
		}

		public void setEnabled(boolean enabled) {
			this.enabled = enabled;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public Set<UserRole> getUserRoles() {
			return userRoles;
		}

		public void setUserRoles(Set<UserRole> userRoles) {
			this.userRoles = userRoles;
		}

		public Set<Address> getUserAddresses() {
			return userAddresses;
		}

		public void setUserAddresses(Set<Address> userAddresses) {
			this.userAddresses = userAddresses;
		}

		public Set<Phone> getUserPhones() {
			return userPhones;
		}

		public void setUserPhones(Set<Phone> userPhones) {
			this.userPhones = userPhones;
		}

		public long getVersion() {
			return version;
		}

		public void setVersion(long version) {
			this.version = version;
		}

	}

	public static class UserRole {
		private Role role;
		private boolean selected;

		public UserRole(Role role, boolean selected) {
			super();
			this.role = role;
			this.selected = selected;
		}

		public UserRole() {
			super();
		}

		public Role getRole() {
			return role;
		}

		public void setRole(Role role) {
			this.role = role;
		}

		public boolean isSelected() {
			return selected;
		}

		public void setSelected(boolean selected) {
			this.selected = selected;
		}
	}

}
