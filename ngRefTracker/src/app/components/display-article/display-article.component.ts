import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CitationStyle } from 'src/app/models/citation-style';
import { Journal } from 'src/app/models/journal';
import { JournalArticle } from 'src/app/models/journal-article';
import { MyCollection } from 'src/app/models/my-collection.model';
import { AuthService } from 'src/app/services/auth.service';
import { CitationStyleService } from 'src/app/services/citation-style.service';
import { JournalArticleService } from 'src/app/services/journal-article.service';
import { JournalService } from 'src/app/services/journal.service';
import { MyCollectionService } from 'src/app/services/my-collection.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-display-article',
  templateUrl: './display-article.component.html',
  styleUrls: ['./display-article.component.scss']
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
  moreInfo: boolean = false;
  underConstructionMessage: string;
  articleRemoved: boolean = false;
  addedMessage: string;
  chosenPalette: string;

  constructor(
    private auth: AuthService,
    private collServ: MyCollectionService,
    private jaServ: JournalArticleService,
    private journalServ: JournalService,
    private router: Router,
    private userServ: UserService
    ) { }

    ngOnInit(): void {
    this.auth.guardRoute();
    this.chosenPalette = this.userServ.loadPalette();
    this.loadArticle();
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
    this.chosenStyle = citationStyle;
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
}
