import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-card-footer-my-coll',
  templateUrl: './article-card-footer-my-coll.component.html',
  styleUrls: ['./article-card-footer-my-coll.component.css']
})
export class ArticleCardFooterMyCollComponent implements OnInit {

  @Input() viewCite: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
