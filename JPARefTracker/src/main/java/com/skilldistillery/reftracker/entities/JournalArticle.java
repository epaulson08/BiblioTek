package com.skilldistillery.reftracker.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "journal_article")
public class JournalArticle {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String title;

	@Column(name = "volume_num")
	private Integer volumeNum;

	@Column(name = "year_published")
	private Integer yearPublished;

	private String doi;

	@ManyToOne
	@JoinColumn(name = "journal_id")
	private Journal journal;

	@ManyToMany(mappedBy = "articles")
	private List<Author> authors;
	
	private String pages;
	
//////// Constructors: 
	public JournalArticle() {
	}

//////// Getters and Setters: 
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Integer getVolumeNum() {
		return volumeNum;
	}

	public void setVolumeNum(Integer volumeNum) {
		this.volumeNum = volumeNum;
	}

	public Integer getYearPublished() {
		return yearPublished;
	}

	public void setYearPublished(Integer yearPublished) {
		this.yearPublished = yearPublished;
	}

	public String getDoi() {
		return doi;
	}

	public void setDoi(String doi) {
		this.doi = doi;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public List<Author> getAuthors() {
		return authors;
	}

	public void setAuthors(List<Author> authors) {
		this.authors = authors;
	}

	public Journal getJournal() {
		return journal;
	}

	public void setJournal(Journal journal) {
		this.journal = journal;
	}
	
	public String getPages() {
		return pages;
	}

	public void setPages(String pages) {
		this.pages = pages;
	}

	//////// add, remove Author
	public void addAuthor(Author author) {
		if (authors == null) {
			authors = new ArrayList<>();
		}
		if (!authors.contains(author)) {
			authors.add(author);
			author.addJournalArticle(this);
		}
	}

	public void removeAuthor(Author author) {
		if (authors != null && authors.contains(author)) {
			authors.remove(author);
			author.removeJournalArticle(this);
		}
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
		JournalArticle other = (JournalArticle) obj;
		if (id != other.id)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "JournalArticle [id=" + id + ", title=" + title + ", volumeNum=" + volumeNum + ", yearPublished="
				+ yearPublished + ", doi=" + doi + "]";
	}

}
