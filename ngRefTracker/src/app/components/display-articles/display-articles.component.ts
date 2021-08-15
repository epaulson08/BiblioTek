import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Event } from '@angular/router';
import { JournalArticle } from 'src/app/models/journal-article';

@Component({
  selector: 'app-display-articles',
  templateUrl: './display-articles.component.html',
  styleUrls: ['./display-articles.component.css']
})
export class DisplayArticlesComponent implements OnInit {
  @Input() articlesToDisplay: JournalArticle[];
  @Input() myCollectionView: boolean;
  @Output() showHeaderEvent =
    new EventEmitter<boolean>();
  showOneArticle: boolean;
  selected: JournalArticle = null;

  constructor() { }

  ngOnInit(): void {
    this.showOneArticle = false;
  }

  showSelected(article: JournalArticle): void {
    this.selected = article;
    this.showOneArticle = true;
    this.showHeaderEvent.emit(false);
  }

  comeBack(event: boolean): void {
    this.showOneArticle = false;
    console.log(event);

    this.showHeaderEvent.emit(true);
  }
}
