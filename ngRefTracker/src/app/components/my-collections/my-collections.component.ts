import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CitationStyle } from 'src/app/models/citation-style';
import { JournalArticle } from 'src/app/models/journal-article';
import { MyCollection } from 'src/app/models/my-collection.model';
import { FullAmaPipe } from 'src/app/pipes/ama/full-ama.pipe';
import { ApaHtmlPipe } from 'src/app/pipes/apa/apa-html.pipe';
import { FullIeeePipe } from 'src/app/pipes/ieee/full-ieee.pipe';
import { FullNlmPipe } from 'src/app/pipes/nlm/full-nlm.pipe';
import { AuthService } from 'src/app/services/auth.service';
import { CitationStyleService } from 'src/app/services/citation-style.service';
import { MyCollectionService } from 'src/app/services/my-collection.service';

@Component({
  selector: 'app-my-collections',
  templateUrl: './my-collections.component.html',
  styleUrls: ['./my-collections.component.css']
})
export class MyCollectionsComponent implements OnInit {

  /////////
  // FIELDS

  // initialization
  allCollections: MyCollection[];
  userId: number;
  myCollectionView: boolean = true;

  // UI
  myCollection: MyCollection;
  viewColl: MyCollection;
  underConstructionMessage: boolean = false;
  moreInfo: boolean = false;
  switch: boolean = false;
  chosenStyle: CitationStyle;
  citationOutput: string = "";
  selectedJa: JournalArticle;
  clickedChooseStyle: boolean = false;

  // CRUD
  citationStyles: CitationStyle[];

  //////////
  // METHODS

  // initialization
  constructor(
    private collServ: MyCollectionService,
    private csServ: CitationStyleService,
    private auth: AuthService,
    private router: Router
    ) { }

    ngOnInit(): void {
      if (!this.auth.checkLogin()) this.router.navigateByUrl("home");
      this.loadMyCollections();
      this.loadCitationStyles();
    }

    loadMyCollections(): void {
      this.collServ.findAllAsUser().subscribe(
        success => {
          this.allCollections = success;
          return success;
        },
        failure => {
          console.error(failure);
        });
        return null;
  }

  // UI
  viewMyCollection(coll: MyCollection): void {
    this.viewColl = coll;
  }

  editCollection(coll: MyCollection): void {
    this.underConstructionMessage = true;
    this.myCollection = coll;
  }

  citeAll(coll: MyCollection): void {
    this.myCollection = coll;
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

  back(): void {
    this.myCollection = null;
  }

  chooseStyle(citationStyle: CitationStyle) {
    this.moreInfo = false;
    // workaround to force reload of [outerHTML] span:
    this.chosenStyle = citationStyle;
    this.citationOutput = "";
    this.citationOutput += "<hr />";
    this.myCollection.articles.forEach(ja => {
      this.citationOutput += this.formatByCitationStyle(this.chosenStyle, ja);
      this.citationOutput += "<hr />";
    });
    this.switch = !this.switch;
    this.clickedChooseStyle = true;
  }

  private formatByCitationStyle(style: CitationStyle, ja: JournalArticle): string {
    switch (style.abbreviation) {
      case "AMA": return new FullAmaPipe().transform(ja);
      case "APA": return new ApaHtmlPipe().transform(ja);
      case "NLM": return new FullNlmPipe().transform(ja);
      case "IEEE": return new FullIeeePipe().transform(ja);
      default: return "Citation style not found.";
    }
  }

  // CRUD
  findMyCollectionByIdAsUser(myCollectionId: number): void {
    this.collServ.findByIdAsUser(myCollectionId).subscribe(
      success => {
        this.myCollection = success;
        return success;
      },
      failure => {
        console.error(failure);
      });
    return null;
  }

}
