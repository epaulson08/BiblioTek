import { Component, OnInit, Input } from '@angular/core';
import { JournalArticle } from 'src/app/models/journal-article';

@Component({
  selector: 'app-display-articles',
  templateUrl: './display-articles.component.html',
  styleUrls: ['./display-articles.component.css']
})
export class DisplayArticlesComponent implements OnInit {
  @Input() articlesToDisplay: JournalArticle[];
  @Input() myCollectionView: boolean;
  showOneArticle: boolean;
  selected: JournalArticle = null;

  constructor() { }

  ngOnInit(): void {
    this.showOneArticle = false;
  }

  showSelected(article: JournalArticle): void {
    this.selected = article;
    this.showOneArticle = true;
  }

  comeBack(): void {
    this.showOneArticle = false;
  }
}
