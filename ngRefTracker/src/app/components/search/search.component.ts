import { Component, OnInit } from '@angular/core';
import { Journal } from 'src/app/models/journal';
import { JournalArticle } from 'src/app/models/journal-article';
import { JournalArticleService } from 'src/app/services/journal-article.service';
import { JournalService } from 'src/app/services/journal.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  ja: JournalArticle = new JournalArticle();
  selected: JournalArticle = new JournalArticle();
  articleResults: JournalArticle[];
  editJa: JournalArticle;
  allJournals: Journal[];
  selectedJournal: Journal = new Journal();

  constructor(private jaServ: JournalArticleService, private journalServ: JournalService) { }

  ngOnInit(): void {
    this.loadJournals();
  }


  show(form): void {
    this.jaServ.show(form.id.value).subscribe(
      dataReceived => {
        this.ja = dataReceived;
        console.warn("**debug: JournalArticleService, show(), dataReceived.title=" + dataReceived.title);
        this.selected = Object.assign({}, this.ja);
      },
      failure => {
        console.error("show() failed: ");
        console.error(failure);
      });
  }

  search(form): void {
    this.jaServ.search(form.searchTerm.value).subscribe(
      dataReceived => {
        this.articleResults = dataReceived;
      },
      failure => {
        console.error("search() failed: ");
        console.error(failure);
      });
  }

  showAllByJournal(): void {
    this.jaServ.showAllByJournal(this.selectedJournal).subscribe(
      dataReceived => {
        this.articleResults = dataReceived;
      },
      failure => {
        console.error("showAllByJournal() failed: ");
        console.error(failure);
      });
  }

  update(ja: JournalArticle) {
    if (ja != null) {
      this.jaServ.update(ja).subscribe(
        data => { this.editJa = null; this.selected = new JournalArticle(); },
        err => { console.error("Observer got an error: " + err); });
    }
    else {
      console.error("problem occurred in component.ts, in update()");
    }
  }


  delete(id: number): void {
    this.jaServ.delete(id).subscribe(
      data => {

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
        this.allJournals = success;
        return success;
      },
      failure => {
        console.error("loadJournals() failed: ");
        console.error(failure);
      });
    return null;
  }

  //////// utilities:
  setEdit(ja: JournalArticle): void {
    this.editJa = ja;
  }

  cancelEdit(): void {
    this.editJa = null;
  }



}
