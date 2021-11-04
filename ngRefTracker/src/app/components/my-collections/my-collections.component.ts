import { Component, OnInit } from '@angular/core';
import { CitationStyle } from 'src/app/models/citation-style';
import { JournalArticle } from 'src/app/models/journal-article';
import { MyCollection } from 'src/app/models/my-collection.model';
import { AuthService } from 'src/app/services/auth.service';
import { CitationStyleService } from 'src/app/services/citation-style.service';
import { MyCollectionService } from 'src/app/services/my-collection.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-collections',
  templateUrl: './my-collections.component.html',
  styleUrls: ['./my-collections.component.scss'],
})
export class MyCollectionsComponent implements OnInit {
  /////////
  // FIELDS

  // initialization
  allCollections: MyCollection[];
  userId: number;
  myCollectionView: boolean = true;
  chosenPalette: string;

  // UI
  collToCiteAll: MyCollection;
  collToEdit: MyCollection;
  collToView: MyCollection;
  moreInfo: boolean = false;
  chosenCitationStyle: CitationStyle;
  clickedChooseStyle: boolean = false;
  underConstructionMessage: string;

  // CRUD
  citationStyles: CitationStyle[];

  //////////
  // METHODS

  // initialization
  constructor(
    private collServ: MyCollectionService,
    private csServ: CitationStyleService,
    private userServ: UserService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.auth.guardRoute();
    this.chosenPalette = this.userServ.loadPalette();
    this.loadMyCollections();
    this.loadCitationStyles();
  }

  loadMyCollections(): void {
    this.collServ.findAllAsUser().subscribe(
      (success) => {
        this.allCollections = success;
        return success;
      },
      (failure) => {
        console.error(failure);
      }
    );
    return null;
  }

  // UI
  viewMyCollection(coll: MyCollection): void {
    this.collToView = coll;
  }

  editCollection(coll: MyCollection): void {
    this.underConstructionMessage = 'This feature is under construction.';
    this.collToEdit = coll;
  }

  citeAll(coll: MyCollection): void {
    this.collToCiteAll = coll;
  }

  loadCitationStyles() {
    this.csServ.findAll().subscribe(
      (success) => {
        this.citationStyles = success;
        // alphabetize by abbreviation:
        this.citationStyles.sort((a, b) =>
          a.abbreviation.localeCompare(b.abbreviation)
        );
        return success;
      },
      (failure) => {
        console.error(failure);
      }
    );
    return null;
  }

  back(): void {
    this.collToEdit = null;
    this.collToView = null;
    this.collToCiteAll = null;
  }

  chooseCitationStyle(cs: CitationStyle) {
    this.moreInfo = false;
    this.chosenCitationStyle = cs;
    this.clickedChooseStyle = true;
  }
}
