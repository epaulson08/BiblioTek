package com.skilldistillery.reftracker.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "citation_style")
public class CitationStyle {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String name;

	@Column(name = "definitive_reference")
	private String definitiveReference;

	@Column(name = "definitive_reference_url")
	private String definitiveReferenceUrl;

	private String abbreviation;
	
	@OneToMany(mappedBy = "citationStyle")
	private List<CitationStyleLink> links;
	
	@JsonIgnore
	@ManyToMany (mappedBy = "citationStyles")
	private List<User> users;

	// ctors
	public CitationStyle() {
	}

	// get/set
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public List<User> getUsers() {
		return users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDefinitiveReference() {
		return definitiveReference;
	}

	public void setDefinitiveReference(String definitiveReference) {
		this.definitiveReference = definitiveReference;
	}

	public String getDefinitiveReferenceUrl() {
		return definitiveReferenceUrl;
	}

	public void setDefinitiveReferenceUrl(String definitiveReferenceUrl) {
		this.definitiveReferenceUrl = definitiveReferenceUrl;
	}

	public String getAbbreviation() {
		return abbreviation;
	}

	public void setAbbreviation(String abbreviation) {
		this.abbreviation = abbreviation;
	}

	public List<CitationStyleLink> getLinks() {
		return links;
	}

	public void setLinks(List<CitationStyleLink> links) {
		this.links = links;
	}

	// add, remove User
	public void addUser(User user) {
		if (users == null) {
			users = new ArrayList<>();
		}
		if (!users.contains(user)) {
			users.add(user);
			user.addCS(this);
		}
	}

	public void removeUser(User user) {
		if (users != null && users.contains(user)) {
			users.remove(user);
			user.removeCS(this);
		}
	}
	
	// hash, equals, toString
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		CitationStyle other = (CitationStyle) obj;
		if (id != other.id)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "CitationStyle [id=" + id + ", name=" + name + ", definitiveReference=" + definitiveReference
				+ ", definitiveReferenceUrl=" + definitiveReferenceUrl + ", abbreviation=" + abbreviation + "]";
	}

}
