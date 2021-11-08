import { Component, Input, OnInit } from '@angular/core';
import { CitationStyle } from 'src/app/models/citation-style';
import { JournalArticle } from 'src/app/models/journal-article';

@Component({
  selector: 'app-article-card-body',
  templateUrl: './article-card-body.component.html',
  styleUrls: ['./article-card-body.component.css']
})
export class ArticleCardBodyComponent implements OnInit {

  @Input() ja: JournalArticle;
  editJa: JournalArticle;
  @Input() viewCite: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  chooseStyle(cs: CitationStyle) {

  }

}
