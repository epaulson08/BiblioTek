import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Journal } from 'src/app/models/journal';
import { JournalArticle } from 'src/app/models/journal-article';
import { JournalArticleService } from 'src/app/services/journal-article.service';
import { JournalService } from 'src/app/services/journal.service';


@Component({
  selector: 'app-list-all',
  templateUrl: './list-all.component.html',
  styleUrls: ['./list-all.component.css']
})
export class ListAllComponent implements OnInit {

  //////// fields
  journalArticles: JournalArticle[] = [];
  ja: JournalArticle = new JournalArticle();
  editJa: JournalArticle;
  editJournal: Journal = new Journal();
  selected: JournalArticle;

  allJournals: Journal[] = [];

  //////// init
  constructor(
    private jaServ: JournalArticleService, private journalServ: JournalService, private route: ActivatedRoute
  ) {

  }
  ngOnInit(): void {
    console.warn("************************** Loaded");
    // console.warn("**debug: JournalArticleComponent: ja.title=" + this.ja.title);
    this.loadJournalArticles();
    this.loadJournals();
  }

  //////// CRUD
  loadJournalArticles(): JournalArticle[] {
    this.jaServ.index().subscribe(
      success => {
        this.journalArticles = success;
        return success;
      },
      failure => {
        console.error(failure);
      });
    return null;
  }

  loadJournals(): Journal[] {
    this.journalServ.index().subscribe(
      success => {
        this.allJournals = success;
        return success;
      },
      failure => {
        console.error("JournalArticleComponent.loadJournals() failed: ");
        console.error(failure);
      });
    return null;
  }


  update(ja: JournalArticle) {
    ja.journal = this.editJournal;
    if (ja != null && ja.journal != null) {
      this.jaServ.update(ja).subscribe(
        data => { this.loadJournalArticles();
          this.loadJournals();
          this.editJa = null;
          this.editJournal = null;},
        err => { console.error("Observer got an error: " + err); });
    }
    else {
      console.error("problem occurred in component.ts, in update()");
    }
  }


  delete(id: number): void {
    this.jaServ.delete(id).subscribe(
      data => {
        this.loadJournalArticles();
        this.loadJournals();
      },
      err => {
        console.error("Observer got an error: " + err);
      }
    );
  }


  //////// utilities:
  setEdit(ja: JournalArticle): void {
    this.editJa = ja;
    this.editJournal = ja.journal;
  }

  cancelEdit(): void {
    this.editJa = null;
  }

}
