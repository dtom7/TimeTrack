package com.sreeven.timetrack.domain;

import java.util.ArrayList;
import java.util.List;

public class LinkWrapper {
	
	private boolean success;
	private List<LinkInfo> data;
	public LinkWrapper(boolean success, User user) {
		this.success = success;
		this.data = new ArrayList<LinkInfo>();
		System.out.println(user.getUserRoles());
		if (user.getUserRoles().contains(Role.ROLE_ADMIN)) {
			this.data.add(new LinkInfo("My Profile", "My-Profile"));
			this.data.add(new LinkInfo("My Notifications", "My-Notifications"));
			this.data.add(new LinkInfo("Manage Users", "Manage-Users"));
			this.data.add(new LinkInfo("Manage Projects", "Manage-Projects"));
			this.data.add(new LinkInfo("Manage Clients", "Manage-Clients"));
			this.data.add(new LinkInfo("Approve Timesheets", "Approve-Timesheets"));
		} else {
			this.data.add(new LinkInfo("My Profile", "My-Profile"));
			this.data.add(new LinkInfo("My Timesheets", "My-Timesheets"));
			this.data.add(new LinkInfo("My Notifications", "My-Notifications"));
		}
	}
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public List<LinkInfo> getData() {
		return data;
	}
	public void setData(List<LinkInfo> data) {
		this.data = data;
	}
	
	private static class LinkInfo {
		private String link;
		private String id;
		public LinkInfo() {
		}
		public LinkInfo(String link, String id) {
			this.link = link;
			this.id = id;
		}
		public String getLink() {
			return link;
		}
		public void setLink(String link) {
			this.link = link;
		}
		public String getId() {
			return id;
		}
		public void setId(String id) {
			this.id = id;
		}	
	}
	
}
