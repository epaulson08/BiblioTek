import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-card-footer',
  templateUrl: './article-card-footer.component.html',
  styleUrls: ['./article-card-footer.component.css']
})
export class ArticleCardFooterComponent implements OnInit {

  @Input() viewCite: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
