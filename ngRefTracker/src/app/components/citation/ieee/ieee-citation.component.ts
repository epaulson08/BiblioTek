import { Component, Input, OnInit } from '@angular/core';
import { JournalArticle } from 'src/app/models/journal-article';

@Component({
  selector: 'app-ieee-citation',
  templateUrl: './ieee-citation.component.html',
  styleUrls: ['./ieee-citation.component.scss'],
})
export class IeeeCitationComponent implements OnInit {
  @Input() ja: JournalArticle;

  constructor() {}

  ngOnInit(): void {}
}
