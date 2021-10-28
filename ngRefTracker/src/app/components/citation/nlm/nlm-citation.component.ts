import { Component, Input, OnInit } from '@angular/core';
import { JournalArticle } from 'src/app/models/journal-article';

@Component({
  selector: 'app-nlm-citation',
  templateUrl: './nlm-citation.component.html',
  styleUrls: ['./nlm-citation.component.css'],
})
export class NlmCitationComponent implements OnInit {
  @Input() ja: JournalArticle;

  constructor() {}

  ngOnInit(): void {}
}
