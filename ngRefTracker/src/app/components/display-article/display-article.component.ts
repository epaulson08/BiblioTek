import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CitationStyle } from 'src/app/models/citation-style';
import { Journal } from 'src/app/models/journal';
import { JournalArticle } from 'src/app/models/journal-article';
import { MyCollection } from 'src/app/models/my-collection.model';
import { FullAmaPipe } from 'src/app/pipes/ama/ama-html.pipe';
import { ApaHtmlPipe } from 'src/app/pipes/apa/apa-html.pipe';
import { IeeeHtmlPipe } from 'src/app/pipes/ieee/ieee-html.pipe';
import { FullNlmPipe } from 'src/app/pipes/nlm/full-nlm.pipe';
import { AuthService } from 'src/app/services/auth.service';
import { CitationStyleService } from 'src/app/services/citation-style.service';
import { JournalArticleService } from 'src/app/services/journal-article.service';
import { JournalService } from 'src/app/services/journal.service';
import { MyCollectionService } from 'src/app/services/my-collection.service';

@Component({
  selector: 'app-display-article',
  templateUrl: './display-article.component.html',
  styleUrls: ['./display-article.component.css']
})
export class DisplayArticleComponent implements OnInit {

  @Input() collId: number;
  @Input() articleId: number;
  @Input() myCollectionView: boolean;
  selected: JournalArticle = new JournalArticle();
  editJa: JournalArticle;
  editJournal: Journal;
  deleted: boolean = false;
  allJournals: Journal[];
  viewCite: boolean = false;
  citationStyles: CitationStyle[];
  chosenStyle: CitationStyle;
  citationOutput: string;
  switch: boolean = false;
  moreInfo: boolean = false;
  underConstructionMessage: string;
  articleRemoved: boolean = false;
  myCollections: MyCollection[];
  addedMessage: string;

  constructor(
    private auth: AuthService,
    private collServ: MyCollectionService,
    private csServ: CitationStyleService,
    private jaServ: JournalArticleService,
    private journalServ: JournalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.auth.checkLogin()) { this.router.navigateByUrl("home"); }
    this.loadArticle();
    this.loadCitationStyles();
    this.loadMyCollections();
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
        // alphabetize by abbreviation:
        this.citationStyles.sort((a, b) => a.abbreviation.localeCompare(b.abbreviation));
        return success;
      },
      failure => {
        console.error(failure);
      });
    return null;
  }

  loadMyCollections() {
    this.collServ.findAllAsUser().subscribe(
      success => {
        this.myCollections = success;
      },
      failure => {
        console.error(failure);
      });
  }

  loadJournals(): Journal[] {
    this.journalServ.index().subscribe(
      success => {
        this.allJournals = success;
        return success;
      },
      failure => {
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
    else if (whereLast === "display-all-articles") {
      this.router.navigateByUrl("display-all-articles");
    }
    else {
      this.router.navigateByUrl("display-all-articles");
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
  }

  resetCite() {
    this.viewCite = false;
  }

  chooseStyle(citationStyle: CitationStyle) {
    this.moreInfo = false;

    // workaround to force reload of [outerHTML] span:
    this.switch = !this.switch;

    this.chosenStyle = citationStyle;
    this.citationOutput = this.formatByCitationStyle(this.chosenStyle);

  }

  toggleMoreInfo(): void {
    this.moreInfo = !this.moreInfo;
  }

  addToCollection(myCollectionId: number, myCollectionName: string, journalArticleId: number): void {
    this.collServ.addArticle(myCollectionId, journalArticleId)
      .subscribe(
        success => {
          this.addedMessage = myCollectionName;
        },
        failure => {
          console.error(failure);
        }
      )
  }

  removeFromCollection(myCollectionId: number, journalArticleId): void {
    this.collServ.removeArticle(myCollectionId, journalArticleId).subscribe(
      success => {
        this.articleRemoved = true;
      },
      failure => {
        console.error(failure);
      });
  }

  private formatByCitationStyle(style: CitationStyle): string {
    switch (style.abbreviation) {
      case "AMA": return new FullAmaPipe().transform(this.selected);
      case "APA": return new ApaHtmlPipe().transform(this.selected);
      case "NLM": return new FullNlmPipe().transform(this.selected);
      case "IEEE": return new IeeeHtmlPipe().transform(this.selected);
      default: return "Citation style not found.";
    }
  }
}
