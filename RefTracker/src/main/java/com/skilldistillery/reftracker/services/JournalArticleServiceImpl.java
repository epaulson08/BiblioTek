package com.skilldistillery.reftracker.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.reftracker.controllers.PayloadUtility;
import com.skilldistillery.reftracker.entities.Author;
import com.skilldistillery.reftracker.entities.JournalArticle;
import com.skilldistillery.reftracker.entities.MyCollection;
import com.skilldistillery.reftracker.entities.User;
import com.skilldistillery.reftracker.repositories.AuthorRepository;
import com.skilldistillery.reftracker.repositories.JournalArticleRepository;
import com.skilldistillery.reftracker.repositories.UserRepository;

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
	private MyCollectionService collServ;

	@Autowired
	private UserRepository userRepo;

	@Override
	public List<JournalArticle> index() {
		List<JournalArticle> articles = jaRepo.findAll();
		return articles;
	}

	@Override
	public long count() {
		return jaRepo.count();
	}

	@Override
	public JournalArticle findById(int id) {
		Optional<JournalArticle> opt = jaRepo.findById(id);
		if (opt.isPresent()) {
			return opt.get();
		}
		return null;
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
	public JournalArticle create(PayloadUtility payload, String username) {
		JournalArticle payloadJA, managedJA;
		Author managedAuthor;
		List<Author> payloadAuthors;
		List<Author> managedAuthors = new ArrayList<>();

		payloadJA = payload.getJa();
		payloadAuthors = payload.getAuthors();

		// Persist journal article:
		managedJA = jaRepo.saveAndFlush(payloadJA);
		int managedJAId = managedJA.getId();

		// Persist each author:
		for (Author a : payloadAuthors) {
			managedAuthor = authorServ.create(a);
			managedAuthors.add(managedAuthor);
			managedAuthor = null;
		}

		// Add each author to the journal article:
		for (Author ma : managedAuthors) {
			addAuthor(managedJAId, ma.getId());
		}

		// Add the article to the user's all_articles_for_user
		User managedUser = null;
		managedUser = userRepo.findByUsername(username);
		managedUser.addJA(managedJA);
		managedJA.addUser(managedUser);

		return managedJA;
	}

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
	public List<JournalArticle> findByJournalId(int journalId) {
		return jaRepo.findByJournalId(journalId);
	}

}
