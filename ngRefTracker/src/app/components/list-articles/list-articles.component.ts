import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Journal } from 'src/app/models/journal';
import { JournalArticle } from 'src/app/models/journal-article';
import { JournalArticleService } from 'src/app/services/journal-article.service';
import { JournalService } from 'src/app/services/journal.service';


@Component({
  selector: 'app-list-all',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.css']
})
export class ListArticlesComponent implements OnInit {

  //////// fields
  journalArticles: JournalArticle[] = [];
  editJa: JournalArticle;
  editJournal: Journal;
  selected: JournalArticle;
  deleted: boolean = false;

  allJournals: Journal[] = [];

  //////// init
  constructor(
    private jaServ: JournalArticleService, private journalServ: JournalService, private route: ActivatedRoute
  ) {

  }
  ngOnInit(): void {
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
        this.editJa = null;
        this.editJournal = null;
        this.deleted = true;
      },
      err => {
        console.error("Observer got an error: " + err);
      }
    );
  }


  //////// utilities:
  setSelected(ja: JournalArticle): void {
    this.selected = ja;
  }

  clearSelected() : void {
    this.selected = null;
    this.editJa = null;
    this.editJournal = null;
    this.deleted = false;
  }

  setEdit(): void {
    this.editJa = this.selected;
    this.editJournal = this.selected.journal;
  }

  cancelEdit(): void {
    this.editJa = null;
    this.editJournal = null;
  }

}
