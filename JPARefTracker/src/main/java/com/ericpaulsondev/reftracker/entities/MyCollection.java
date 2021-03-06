package com.ericpaulsondev.reftracker.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "my_collection")
public class MyCollection {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String name;

	private String description;
	
	@ManyToMany
	@JoinTable(name = "my_collection_journal_article", joinColumns = @JoinColumn(name = "my_collection_id"), inverseJoinColumns = @JoinColumn(name = "journal_article_id"))
	private List<JournalArticle> articles;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	
	// ctors:
	public MyCollection() {
	}

	public MyCollection(String name, String description) {
		this.name = name;
		this.description = description;
	}
	
	// Get/set:
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<JournalArticle> getArticles() {
		return articles;
	}

	public void setArticles(List<JournalArticle> articles) {
		this.articles = articles;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	// Add, remove JournalArticle
	public void addJournalArticle(JournalArticle ja) {
		if (articles == null) {
			articles = new ArrayList<>();
		}
		if (!articles.contains(ja)) {
			articles.add(ja);
		}
		ja.addMyCollection(this);
	}

	public void removeJournalArticle(JournalArticle ja) {
		if (articles != null && articles.contains(ja)) {
			articles.remove(ja);
		}
		ja.removeMyCollection(this);
	}
	
	// Equals, hash, toString:
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
		MyCollection other = (MyCollection) obj;
		if (id != other.id)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "MyCollection [id=" + id + ", name=" + name + ", description=" + description + "]";
	}
	
}
