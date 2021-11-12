import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-article-card-footer',
  templateUrl: './article-card-footer.component.html',
  styleUrls: ['./article-card-footer.component.css']
})
export class ArticleCardFooterComponent implements OnInit {

  @Input() viewCite: boolean;
  @Output() viewCiteChange = new EventEmitter<boolean>();

  @Input() chosenPalette: string;

  constructor() { }

  ngOnInit(): void {
  }

  clickCite(): void {
    this.viewCite = true;
    this.viewCiteChange.emit(this.viewCite);
  }

}
