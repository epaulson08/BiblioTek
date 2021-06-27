package com.skilldistillery.reftracker.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "citation_style_link")
public class CitationStyleLink {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String url;

	private String comment;

	@ManyToOne
	@JoinColumn (name = "citation_style_id")
	private CitationStyle citationStyle;

	// ctors
	public CitationStyleLink() {
	}

	// get/set
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public CitationStyle getCitationStyle() {
		return citationStyle;
	}

	public void setCitationStyle(CitationStyle citationStyle) {
		this.citationStyle = citationStyle;
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
		CitationStyleLink other = (CitationStyleLink) obj;
		if (id != other.id)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "CitationStyleLink [id=" + id + ", url=" + url + ", comment=" + comment + "]";
	}

}
