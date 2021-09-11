import { Component, OnInit, Input, AfterContentChecked, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RoutesRecognized } from '@angular/router';
import { Journal } from 'src/app/models/journal';
import { JournalArticle } from 'src/app/models/journal-article';
import { AuthService } from 'src/app/services/auth.service';
import { JournalArticleService } from 'src/app/services/journal-article.service';
import { JournalService } from 'src/app/services/journal.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnChanges {

  ja: JournalArticle = new JournalArticle();
  selected: JournalArticle = new JournalArticle();
  articleResults: JournalArticle[];
  editJa: JournalArticle;
  allJournals: Journal[];
  selectedJournal: Journal = new Journal();
  searchTerm: string = null;
  routeSearchTerm: string;

  constructor(
    private auth: AuthService,
    private jaServ: JournalArticleService,
    private journalServ: JournalService,
    private router: Router,
    private route: ActivatedRoute
    ) {
      this.router.events.forEach((event) => {
        if(event instanceof NavigationEnd) {
          this.routeSearchTerm = this.route.snapshot.paramMap.get('searchTerm');
          this.searchTerm = this.routeSearchTerm;
          if (this.searchTerm) this.search();
        }
      });
    }

    ngOnInit(): void {
    if (!this.auth.checkLogin()) this.router.navigateByUrl("home");
    this.loadJournals();
    localStorage.setItem("lastPage", "search");
    if (localStorage.getItem("lastSearchTerm")) {
      this.searchTerm = localStorage.getItem("lastSearchTerm");
    }
    if (this.searchTerm) this.search();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.warn(changes);

    // this.search();
  }

  show(form): void {
    this.jaServ.show(form.id.value).subscribe(
      dataReceived => {
        this.ja = dataReceived;
        this.selected = Object.assign({}, this.ja);
      },
      failure => {
        console.error("show() failed: ");
        console.error(failure);
      });
  }

  search(): void {
    localStorage.setItem("lastSearchTerm", this.searchTerm);
    this.jaServ.search(this.searchTerm).subscribe(
      dataReceived => {
        this.articleResults = dataReceived;
      },
      failure => {
        console.error("search() failed: ");
        console.error(failure);
      });
  }

  showAllByJournal(): void {
    localStorage.setItem("lastSearchJournal", this.selectedJournal.id.toString());
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

  // utilities:
  setEdit(ja: JournalArticle): void {
    this.editJa = ja;
  }

  cancelEdit(): void {
    this.editJa = null;
  }

  goTo(id: number): void {
    this.router.navigateByUrl('show-article/' + id);
  }

}
