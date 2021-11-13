import { Component, Input, OnInit, Output } from '@angular/core';
import { CitationStyle } from 'src/app/models/citation-style';
import { JournalArticle } from 'src/app/models/journal-article';

@Component({
  selector: 'app-citation-style-switch',
  templateUrl: './citation-style-switch.component.html',
  styleUrls: ['./citation-style-switch.component.scss'],
})
export class CitationStyleSwitchComponent implements OnInit {
  @Input() chosenCitationStyle: CitationStyle;
  @Input() jaToCite: JournalArticle;
  @Input() chosenPalette: string;
  @Input() showMoreInfoButton: boolean;
  showMoreInfo: boolean;

  constructor() {}

  ngOnInit(): void {}

  toggleMoreInfo() {
    this.showMoreInfo = !this.showMoreInfo;
  }
}
