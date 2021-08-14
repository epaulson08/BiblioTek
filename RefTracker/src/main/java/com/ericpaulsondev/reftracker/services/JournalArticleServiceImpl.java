package com.ericpaulsondev.reftracker.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ericpaulsondev.reftracker.entities.Author;
import com.ericpaulsondev.reftracker.entities.JournalArticle;
import com.ericpaulsondev.reftracker.entities.User;
import com.ericpaulsondev.reftracker.repositories.AuthorRepository;
import com.ericpaulsondev.reftracker.repositories.JournalArticleRepository;
import com.ericpaulsondev.reftracker.repositories.UserRepository;

@Service
@Transactional
public class JournalArticleServiceImpl implements JournalArticleService {

	@Autowired
	private JournalArticleRepository jaRepo;
	@Autowired
	private AuthorRepository authorRepo;
	@Autowired
	private AuthorService authorServ;
	@Autowired
	private UserRepository userRepo;

	// READ
	@Override
	public JournalArticle findById(int id) {
		Optional<JournalArticle> opt = jaRepo.findById(id);
		if (opt.isPresent()) {
			return opt.get();
		}
		return null;
	}

	@Override
	public List<JournalArticle> index() {
		List<JournalArticle> articles = jaRepo.findAll();
		return articles;
	}

	@Override
	public List<JournalArticle> search(String searchTerm) {
		return jaRepo.findDistinctByTitleContainsOrAuthors_LastNameContainsIgnoreCase(searchTerm, searchTerm);
	}

	@Override
	public List<JournalArticle> findByUser(String username) {
		List<JournalArticle> jas = null;
		jas = jaRepo.findByUsersUsername(username);
		return jas;
	}

	@Override
	public List<JournalArticle> findByJournalIdAndUsersUsername(int id, String username) {
		List<JournalArticle> jas = null;
		jas = jaRepo.findByJournalIdAndUsersUsername(id, username);
		return jas;
	}

	@Override
	public List<JournalArticle> findByJournalId(int journalId) {
		return jaRepo.findByJournalId(journalId);
	}
	
	@Override
	public long count() {
		return jaRepo.count();
	}

	@Override
	public long countByUsername(String username) {
		return jaRepo.findByUsersUsername(username).size();
	}

	// CREATE
	@Override
	public JournalArticle create(JournalArticle submittedJa, String username) {
		JournalArticle managedJa;
		Author managedAuthor;
		List<Author> submittedAuthors = submittedJa.getAuthors();
		List<Author> managedAuthors = new ArrayList<>();

		// Persist journal article:
		managedJa = jaRepo.saveAndFlush(submittedJa);
		int managedJaId = managedJa.getId();

		// Persist each author:
		for (Author a : submittedAuthors) {
			managedAuthor = authorServ.create(a);
			managedAuthors.add(managedAuthor);
			// Add each author to the journal article:
			addAuthor(managedJaId, managedAuthor.getId());
			managedAuthor = null;
		}

		// Add the article to the user's all_articles_for_user table
		User managedUser = userRepo.findByUsername(username);
		managedUser.addJA(managedJa);
		managedJa.addUser(managedUser);

		return managedJa;
	}

	@Override
	public JournalArticle addAuthor(int jaId, int authorId) {
		JournalArticle ja = null;
		Author author = null;

		Optional<JournalArticle> opt1 = jaRepo.findById(jaId);
		if (opt1.isPresent())
			ja = opt1.get();

		Optional<Author> opt2 = authorRepo.findById(authorId);
		if (opt2.isPresent())
			author = opt2.get();

		ja.addAuthor(author);
		author.addJournalArticle(ja);

		ja = jaRepo.saveAndFlush(ja);
		author = authorRepo.saveAndFlush(author);

		return ja;
	}

	@Override
	public JournalArticle removeAuthor(int jaId, int authorId) {
		// TODO impl
		return null; // FIXME
	}

	// UPDATE
	@Override
	public JournalArticle update(int id, JournalArticle newJa) {
		JournalArticle oldJa = findById(id);
		if (oldJa != null) {
			oldJa.setDoi(newJa.getDoi());
			if (newJa.getJournal() != null)
				oldJa.setJournal(newJa.getJournal());
			oldJa.setTitle(newJa.getTitle());
			oldJa.setVolumeNum(newJa.getVolumeNum());
			oldJa.setYearPublished(newJa.getYearPublished());
			newJa = jaRepo.saveAndFlush(oldJa);
		}
		return newJa;
	}

	// DELETE
	@Override
	public boolean delete(int id) {
		JournalArticle trashArticle = null;

		Optional<JournalArticle> opt = jaRepo.findById(id);
		if (opt.isPresent()) {
			trashArticle = opt.get();

			List<Author> authors = new ArrayList<>(trashArticle.getAuthors());
			if (authors != null) {
				for (Author a : authors)
					trashArticle.removeAuthor(a);
			}
			jaRepo.saveAndFlush(trashArticle);
		}
		opt = null;

		jaRepo.deleteById(id);

		if (!jaRepo.existsById(id))
			return true;

		return false;
	}

}