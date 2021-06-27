package com.skilldistillery.reftracker.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String username;

	private String email;

	private String password;

	private String role;

	@Column(name = "first_name")
	private String firstName;

	@Column(name = "middle_name")
	private String middleName;

	@Column(name = "last_name")
	private String lastName;

	private String suffix;

	private LocalDate dob;

	private Boolean enabled;

	@CreationTimestamp
	@Column(name = "create_date")
	private LocalDateTime createDate;

	@UpdateTimestamp
	@Column(name = "update_date")
	private LocalDateTime updateDate;

	@JsonIgnore
	@OneToMany(mappedBy = "user")
	private List<MyCollection> myCollections;

	@JsonIgnore
	@ManyToMany
	@JoinTable(name = "all_articles_for_user", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "journal_article_id"))
	List<JournalArticle> articles;
	
	@ManyToMany
	@JoinTable(name = "user_citation_style", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "citation_style_id"))
	private List<CitationStyle> citationStyles;

	// ctors
	public User() {
	}

	// get/set
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public List<CitationStyle> getCitationStyles() {
		return citationStyles;
	}

	public void setCitationStyles(List<CitationStyle> citationStyles) {
		this.citationStyles = citationStyles;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
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

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getMiddleName() {
		return middleName;
	}

	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getSuffix() {
		return suffix;
	}

	public void setSuffix(String suffix) {
		this.suffix = suffix;
	}

	public LocalDate getDob() {
		return dob;
	}

	public void setDob(LocalDate dob) {
		this.dob = dob;
	}

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	public LocalDateTime getCreateDate() {
		return createDate;
	}

	public void setCreateDate(LocalDateTime createDate) {
		this.createDate = createDate;
	}

	public LocalDateTime getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(LocalDateTime updateDate) {
		this.updateDate = updateDate;
	}

	public List<MyCollection> getMyCollections() {
		return myCollections;
	}

	public void setMyCollections(List<MyCollection> myCollections) {
		this.myCollections = myCollections;
	}

	public List<JournalArticle> getArticles() {
		return articles;
	}

	public void setArticles(List<JournalArticle> articles) {
		this.articles = articles;
	}

	// add, remove JournalArticle

	//////// add, remove Author from JournalArticle
	public void addJA(JournalArticle ja) {
		if (articles == null) {
			articles = new ArrayList<>();
		}
		if (!articles.contains(ja)) {
			articles.add(ja);
			ja.addUser(this);
		}
	}

	public void removeJA(JournalArticle ja) {
		if (articles != null && articles.contains(ja)) {
			articles.remove(ja);
			ja.removeUser(this);
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
		User other = (User) obj;
		if (id != other.id)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", email=" + email + ", password=" + password + ", role="
				+ role + ", firstName=" + firstName + ", middleName=" + middleName + ", lastName=" + lastName
				+ ", suffix=" + suffix + ", dob=" + dob + ", enabled=" + enabled + ", createDate=" + createDate
				+ ", updateDate=" + updateDate + "]";
	}

}
