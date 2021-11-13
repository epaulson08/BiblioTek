import { Component, Input, OnInit } from '@angular/core';
import { CitationStyle } from 'src/app/models/citation-style';
import { JournalArticle } from 'src/app/models/journal-article';
import { CitationStyleService } from 'src/app/services/citation-style.service';

@Component({
  selector: 'app-article-card-body',
  templateUrl: './article-card-body.component.html',
  styleUrls: ['./article-card-body.component.scss'],
})
export class ArticleCardBodyComponent implements OnInit {
  @Input() ja: JournalArticle;
  editJa: JournalArticle;
  @Input() viewCite: boolean;
  citationStyles: CitationStyle[];
  @Input() chosenPalette: string;
  chosenStyle: CitationStyle;
  moreInfo: boolean = false;
  @Input() jaDeleted: boolean = false;

  constructor(private csServ: CitationStyleService) {}

  ngOnInit(): void {
    this.loadCitationStyles();
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

  chooseStyle(citationStyle: CitationStyle) {
    this.moreInfo = false;
    this.chosenStyle = citationStyle;
  }
}
