import { Component, Input, OnInit, Output } from '@angular/core';
import { CitationStyle } from 'src/app/models/citation-style';
import { JournalArticle } from 'src/app/models/journal-article';

@Component({
  selector: 'app-citation-style-switch',
  templateUrl: './citation-style-switch.component.html',
  styleUrls: ['./citation-style-switch.component.css'],
})
export class CitationStyleSwitchComponent implements OnInit {
  @Input() chosenCitationStyle: CitationStyle;
  @Input() jaToCite: JournalArticle;
  @Input() showHeader: boolean;

  constructor() {}

  ngOnInit(): void {}
}
