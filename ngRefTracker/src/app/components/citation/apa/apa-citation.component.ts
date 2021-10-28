import { Component, Input, OnInit } from '@angular/core';
import { JournalArticle } from 'src/app/models/journal-article';

@Component({
  selector: 'app-apa-citation',
  templateUrl: './apa-citation.component.html',
  styleUrls: ['./apa-citation.component.css']
})
export class ApaCitationComponent implements OnInit {

  @Input() ja: JournalArticle;

  constructor() { }

  ngOnInit(): void {
  }

}
