import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CitationStyle } from 'src/app/models/citation-style';
import { MyCollection } from 'src/app/models/my-collection.model';

@Component({
  selector: 'app-cite-all-ui',
  templateUrl: './cite-all-ui.component.html',
  styleUrls: ['./cite-all-ui.component.css'],
})
export class CiteAllUiComponent implements OnInit {
  @Input() chosenPalette: string;
  @Input() citationStyles: CitationStyle[];
  @Input() collToCiteAll: MyCollection;

  chosenCitationStyle: CitationStyle;
  moreInfo: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  chooseCitationStyle(cs: CitationStyle) {
    this.moreInfo = false;
    this.chosenCitationStyle = cs;
  }
}
