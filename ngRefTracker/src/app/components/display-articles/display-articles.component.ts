import { Component, OnInit, Input } from '@angular/core';
import { JournalArticle } from 'src/app/models/journal-article';

@Component({
  selector: 'app-display-articles',
  templateUrl: './display-articles.component.html',
  styleUrls: ['./display-articles.component.css']
})
export class DisplayArticlesComponent implements OnInit {
  searchTerm: boolean = false;
  @Input() articlesToDisplay: JournalArticle[];

  constructor() { }

  ngOnInit(): void {
  }


}
