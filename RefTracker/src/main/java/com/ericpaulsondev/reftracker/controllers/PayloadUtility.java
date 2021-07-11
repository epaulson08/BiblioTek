package com.ericpaulsondev.reftracker.controllers;

import java.util.List;

import com.ericpaulsondev.reftracker.entities.Author;
import com.ericpaulsondev.reftracker.entities.Journal;
import com.ericpaulsondev.reftracker.entities.JournalArticle;

public class PayloadUtility {

	private Author author;
	private List<Author> authors;
	private JournalArticle ja;
	private List<JournalArticle> jas;
	private Journal journal;
	private List<Journal> journals;
	private Integer userId;
	
	public PayloadUtility() {
	}

	public Author getAuthor() {
		return author;
	}

	public void setAuthor(Author author) {
		this.author = author;
	}

	public List<Author> getAuthors() {
		return authors;
	}

	public void setAuthors(List<Author> authors) {
		this.authors = authors;
	}

	public JournalArticle getJa() {
		return ja;
	}

	public void setJa(JournalArticle ja) {
		this.ja = ja;
	}

	public List<JournalArticle> getJas() {
		return jas;
	}

	public void setJas(List<JournalArticle> jas) {
		this.jas = jas;
	}

	public Journal getJournal() {
		return journal;
	}

	public void setJournal(Journal journal) {
		this.journal = journal;
	}

	public List<Journal> getJournals() {
		return journals;
	}

	public void setJournals(List<Journal> journals) {
		this.journals = journals;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	
	

}
