import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CitationStyle } from 'src/app/models/citation-style';
import { Journal } from 'src/app/models/journal';
import { JournalArticle } from 'src/app/models/journal-article';
import { CitationStyleService } from 'src/app/services/citation-style.service';
import { JournalService } from 'src/app/services/journal.service';

@Component({
  selector: 'app-article-card-body',
  templateUrl: './article-card-body.component.html',
  styleUrls: ['./article-card-body.component.scss'],
})
export class ArticleCardBodyComponent implements OnInit {
  @Input() ja: JournalArticle;
  @Input() viewCite: boolean;
  citationStyles: CitationStyle[];
  @Input() chosenPalette: string;
  chosenStyle: CitationStyle;
  moreInfo: boolean = false;
  @Input() jaDeleted: boolean = false;
  @Input() articleRemoved: boolean;
  @Input() editMode: boolean;
  allJournals: Journal[];
  chosenJournal: Journal;
  @Input() editedJa: JournalArticle;
  @Input() submittedEditMessage: string;

  constructor(
    private csServ: CitationStyleService,
    private journalServ: JournalService
  ) {}

  ngOnInit(): void {
    this.loadCitationStyles();
    this.loadJournals();
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

  // need Journals if editing JournalArticle
  loadJournals(): Journal[] {
    this.journalServ.index().subscribe(
      (success) => {
        this.allJournals = success;
        return success;
      },
      (failure) => {
        console.error(failure);
      }
    );
    return null;
  }

  chooseStyle(citationStyle: CitationStyle) {
    this.moreInfo = false;
    this.chosenStyle = citationStyle;
  }
}
