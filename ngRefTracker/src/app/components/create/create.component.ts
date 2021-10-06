import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Author } from 'src/app/models/author';
import { Journal } from 'src/app/models/journal';
import { JournalArticle } from 'src/app/models/journal-article';
import { AuthService } from 'src/app/services/auth.service';
import { JournalArticleService } from 'src/app/services/journal-article.service';
import { JournalService } from 'src/app/services/journal.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  // fields:
  newJournal: Journal = new Journal();
  newJa: JournalArticle = new JournalArticle();
  newAuthor: Author = new Author();
  authorsList: Author[] = [];
  journals: Journal[] = [];
  chosenPalette: string;

  // init:
  constructor(
    private auth: AuthService,
    private journalServ: JournalService,
    private jaServ: JournalArticleService,
    private userServ: UserService
  ) { }

  ngOnInit(): void {
    this.auth.guardRoute();
    this.chosenPalette = this.userServ.loadPalette();
    this.loadJournals();
  }

  // CRUD:
  create(form) {

    // Set article's scalar fields
    this.newJa.title = form.title.value;
    this.newJa.volumeNum = form.vol.value;
    this.newJa.yearPublished = form.year.value;
    this.newJa.doi = form.doi.value;

    // Select Journal
    this.newJa.journal = this.newJournal;

    // Package article and authorList in payload
    this.newJa.authors = this.authorsList;

    // POST
    this.jaServ.create(this.newJa).subscribe(
      data => {
        this.newJa = new JournalArticle();
        this.newAuthor = new Author();
        this.newJournal = new Journal();
        this.authorsList = [];
        form.reset();
      },
      err => {
        console.error("Observer error: " + err);
      }
    );
  }

  addAuthor() {
    this.authorsList.push(this.newAuthor);
    this.newAuthor = new Author();
  }

  removeAuthor(a: Author) {
    this.authorsList.splice(this.authorsList.indexOf(a), 1);
  }

  // Load journals for <select>
  loadJournals(): Journal[] {
    this.journalServ.index().subscribe(
      success => {
        this.journals = success;
        return success;
      },
      failure => {
        console.error("loadJournals() failed: ");
        console.error(failure);
      });
    return null;
  }

}
