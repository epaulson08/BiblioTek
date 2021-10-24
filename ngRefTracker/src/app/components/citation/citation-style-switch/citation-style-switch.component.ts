import { Component, Input, OnInit } from '@angular/core';
import { CitationStyle } from 'src/app/models/citation-style';

@Component({
  selector: 'app-citation-style-switch',
  templateUrl: './citation-style-switch.component.html',
  styleUrls: ['./citation-style-switch.component.css']
})
export class CitationStyleSwitchComponent implements OnInit {
  @Input() chosenCitationStyle: CitationStyle;

  constructor() { }

  ngOnInit(): void {
  }

}
