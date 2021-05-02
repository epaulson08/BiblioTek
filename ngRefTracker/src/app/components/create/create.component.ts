import { Component, OnInit } from '@angular/core';
import { Author } from 'src/app/models/author';
import { Journal } from 'src/app/models/journal';
import { JournalArticle } from 'src/app/models/journal-article';
import { PayloadUtility } from 'src/app/models/payload-utility.model';
import { JournalArticleService } from 'src/app/services/journal-article.service';
import { JournalService } from 'src/app/services/journal.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  //////// fields:
  newJournal: Journal = new Journal();
  newJa: JournalArticle = new JournalArticle();
  newAuthor: Author = new Author();
  newPayload: PayloadUtility = new PayloadUtility();
  journals: Journal[] = [];

  //////// init:
  constructor(private jaServ: JournalArticleService, private journalServ: JournalService) { }

  ngOnInit(): void {
    this.loadJournals();
  }

  //////// methods:
  create(form) {
    console.warn("**DEBUG: in COMPONENT, create()");
    console.warn("journal = " + this.newJournal.name);
    console.warn("journal = " + this.newJournal.id);

    // Set article's non-object fields
    this.newJa.title = form.title.value;
    this.newJa.volumeNum = form.vol.value;
    this.newJa.yearPublished = form.year.value;
    this.newJa.doi = form.doi.value;

    // Select Journal
    this.newJa.journal = this.newJournal;

    // Create Author object
    this.newAuthor.firstName = form.fname.value;
    this.newAuthor.middleName = form.mid.value;
    this.newAuthor.lastName = form.lname.value;
    this.newAuthor.suffix = form.suffix.value;

    // Package article and author in payload
    this.newPayload.ja = this.newJa;
    this.newPayload.author = this.newAuthor;

    // Fire missile of academe
    this.jaServ.create(this.newPayload).subscribe(
      data => {
        this.newJa = new JournalArticle();
        this.newAuthor = new Author();
        this.newJournal = new Journal();
        this.newPayload = new PayloadUtility();
        form.reset();
      },
      err => {
        console.error("Observer got an error: " + err);
      }
    );
  }

  // Load journals for <select>
  loadJournals(): Journal[] {
    this.journalServ.index().subscribe(
      success => {
        this.journals = success;
        return success;
      },
      failure => {
        console.error("JournalArticleComponent.loadJournals() failed: ");
        console.error(failure);
      });
    return null;
  }



}
