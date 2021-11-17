import { Component, Input, OnInit } from '@angular/core';
import { CitationStyle } from 'src/app/models/citation-style';
import { Journal } from 'src/app/models/journal';
import { JournalArticle } from 'src/app/models/journal-article';
import { AuthService } from 'src/app/services/auth.service';
import { JournalArticleService } from 'src/app/services/journal-article.service';
import { MyCollectionService } from 'src/app/services/my-collection.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-display-article',
  templateUrl: './display-article.component.html',
  styleUrls: ['./display-article.component.scss'],
})
export class DisplayArticleComponent implements OnInit {
  @Input() collId: number;
  @Input() articleId: number;
  @Input() myCollectionView: boolean;

  selectedJa: JournalArticle = new JournalArticle();
  editedJa: JournalArticle;

  // data to load on init
  citationStyles: CitationStyle[];
  allJournals: Journal[];
  chosenPalette: string;

  // ui
  viewCite: boolean = false;
  chosenStyle: CitationStyle;
  moreInfo: boolean = false;
  articleRemoved: boolean = false;
  addedMessage: string;
  jaDeleted: boolean = false;
  editMode: boolean = false;
  submitEdit: boolean = false;
  submittedEditMessage: string = null;

  constructor(
    private auth: AuthService,
    private collServ: MyCollectionService,
    private jaServ: JournalArticleService,
    private userServ: UserService
  ) {}

  ngOnInit(): void {
    this.auth.guardRoute();
    this.chosenPalette = this.userServ.loadPalette();
    this.loadArticle();
  }

  deleteJa($event): void {
    this.delete(this.articleId);
  }

  removeJa($event): void {
    this.removeFromCollection(this.collId, this.articleId);
  }

  loadArticle() {
    this.jaServ.show(this.articleId).subscribe(
      (success) => {
        this.selectedJa = success;
        return success;
      },
      (failure) => {
        console.error(failure);
      }
    );
    return null;
  }

  update() {
    if (this.editedJa != null && this.editedJa.journal != null) {
      this.jaServ.update(this.editedJa).subscribe(
        (data) => {
          this.loadArticle();
          this.editedJa = null;
          this.submittedEditMessage = "Article updated.";
          this.editMode = false;
        },
        (err) => {
          console.error('Observer got an error: ' + err);
        }
      );
    } else {
      console.error('problem occurred in component.ts, in update()');
    }
  }

  delete(id: number): void {
    this.jaServ.delete(id).subscribe(
      (data) => {
        this.loadArticle();
        this.jaDeleted = true;
        this.editedJa = null;
      },
      (err) => {
        console.error('Observer got an error: ' + err);
      }
    );
  }

  setEditMode(): void {
    this.editedJa = this.selectedJa;
    this.viewCite = false;
    this.submittedEditMessage = null;
  }

  cancelEdit(): void {
    this.editedJa = null;
    this.viewCite = false;
  }

  toggleMoreInfo(): void {
    this.moreInfo = !this.moreInfo;
  }

  addToCollection(
    myCollectionId: number,
    myCollectionName: string,
    journalArticleId: number
  ): void {
    this.collServ.addArticle(myCollectionId, journalArticleId).subscribe(
      (success) => {
        this.addedMessage = myCollectionName;
      },
      (failure) => {
        console.error(failure);
      }
    );
  }

  removeFromCollection(myCollectionId: number, journalArticleId): void {
    this.collServ.removeArticle(myCollectionId, journalArticleId).subscribe(
      (success) => {
        this.articleRemoved = true;
      },
      (failure) => {
        console.error(failure);
      }
    );
  }
}
