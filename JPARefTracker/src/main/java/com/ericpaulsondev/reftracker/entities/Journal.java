package com.ericpaulsondev.reftracker.entities;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Journal {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String name;
	
	private String abbreviation;

	@JsonIgnore
	@OneToMany(mappedBy="journal")
	List<JournalArticle> articles;
	
//////// Constructors:
	public Journal() {}

//////// Getters and Setters:
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAbbreviation() {
		return abbreviation;
	}

	public void setAbbreviation(String abbreviation) {
		this.abbreviation = abbreviation;
	}

public List<JournalArticle> getArticles() {
		return articles;
	}

	public void setArticles(List<JournalArticle> articles) {
		this.articles = articles;
	}

	//////// hash, equals, toString:
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
		Journal other = (Journal) obj;
		if (id != other.id)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Journal [id=" + id + ", name=" + name + ", abbreviation=" + abbreviation + "]";
	}
	
	
}
