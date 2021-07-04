import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CitationStyle } from 'src/app/models/citation-style';
import { Journal } from 'src/app/models/journal';
import { JournalArticle } from 'src/app/models/journal-article';
import { AuthService } from 'src/app/services/auth.service';
import { CitationStyleService } from 'src/app/services/citation-style.service';
import { JournalArticleService } from 'src/app/services/journal-article.service';
import { JournalService } from 'src/app/services/journal.service';

@Component({
  selector: 'app-show-article',
  templateUrl: './show-article.component.html',
  styleUrls: ['./show-article.component.css']
})
export class ShowArticleComponent implements OnInit {

  articleId: number;
  selected: JournalArticle = new JournalArticle();
  editJa: JournalArticle;
  editJournal: Journal;
  deleted: boolean = false;
  allJournals: Journal[];
  viewCite: boolean = false;
  apa: boolean = false;
  ama: boolean = false;
  citationStyles: CitationStyle[];

  constructor(private auth: AuthService, private csServ: CitationStyleService, private route: ActivatedRoute, private jaServ: JournalArticleService, private journalServ: JournalService, private router: Router) { }

  ngOnInit(): void {
    if (!this.auth.checkLogin()) this.router.navigateByUrl("home");
    this.articleId = +this.route.snapshot.paramMap.get('articleId');
    this.loadArticle();
    this.loadCitationStyles();
    console.log("citation styles = " + this.citationStyles);

  }

  loadArticle() {
    this.jaServ.show(this.articleId).subscribe(
      success => {
        this.selected = success;
        return success;
      },
      failure => {
        console.error(failure);
      });
    return null;
  }

  loadCitationStyles() {
    this.csServ.findAll().subscribe(
      success => {
        this.citationStyles = success;
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
        data => {
          this.loadArticle();
          this.loadJournals();
          this.editJa = null;
          this.editJournal = null;
        },
        err => { console.error("Observer got an error: " + err); });
    }
    else {
      console.error("problem occurred in component.ts, in update()");
    }
  }

  delete(id: number): void {
    this.jaServ.delete(id).subscribe(
      data => {
        this.loadArticle();
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

  goBack(): void {
    let whereLast: string = localStorage.getItem("lastPage");
    if (whereLast === "search") {
      this.router.navigateByUrl("search");
    }
    else if (whereLast === "listAll") {
      this.router.navigateByUrl("list-articles");
    }
    else {
      this.router.navigateByUrl("list-articles");
    }
  }

  setEdit(): void {
    this.editJa = this.selected;
    this.editJournal = this.selected.journal;
    this.viewCite = false;
  }

  cancelEdit(): void {
    this.editJa = null;
    this.editJournal = null;
    this.viewCite = false;
  }

  cite() {
    this.viewCite = true;
    this.apa = false;
    this.ama = false;
  }

  resetCite() {
    this.viewCite = false;
    this.apa = false;
    this.ama = false;
  }

  // TODO: in future retrieve citation style
  // object from database instead of hardcoding
  showApa() {
    this.apa = true;
    this.ama = false;
  }

  showAma() {
    this.ama = true;
    this.apa = false;
  }
}
