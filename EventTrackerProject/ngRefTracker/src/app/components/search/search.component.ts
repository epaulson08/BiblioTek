import { Component, OnInit } from '@angular/core';
import { JournalArticle } from 'src/app/models/journal-article';
import { JournalArticleService } from 'src/app/services/journal-article.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  ja : JournalArticle = new JournalArticle();
  selected : JournalArticle = new JournalArticle();
  articleResults : JournalArticle[];
  editJa: JournalArticle;

  constructor(private jaServ : JournalArticleService) { }

  ngOnInit(): void {
  }


  show(form): void {
    // console.warn("**debug: in journal-article.component, show(form), form.value=" + form.id.value);
    this.jaServ.show(form.id.value).subscribe(
      dataReceived => {
        this.ja = dataReceived;
        console.warn("**debug: JournalArticleService, show(), dataReceived.title=" + dataReceived.title);
        this.selected = Object.assign({}, this.ja);
      },
      failure => {
        console.error("JournalArticleComponent.loadJournalArticles() failed: ");
        console.error(failure);
      });
  }

  search(form) : void {
    this.jaServ.search(form.searchTerm.value).subscribe(
      dataReceived => {
        this.articleResults = dataReceived;
      },
      failure => {
        console.error("JournalArticleComponent.loadJournalArticles() failed: ");
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


//////// utilities:
  setEdit(ja: JournalArticle): void {
    this.editJa = ja;
  }

  cancelEdit(): void {
    this.editJa = null;
  }



}
