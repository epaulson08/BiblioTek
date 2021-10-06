import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { JournalArticle } from 'src/app/models/journal-article';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-display-articles',
  templateUrl: './display-articles.component.html',
  styleUrls: ['./display-articles.component.css']
})
export class DisplayArticlesComponent implements OnInit {
  showOneArticle: boolean = false;
  @Input() articlesToDisplay: JournalArticle[];
  @Input() myCollectionView: boolean;

  constructor(
    private router: Router
    ) { }

  ngOnInit(): void { }

  goTo(id: number) {
    this.router.navigateByUrl(`show-article/${id}`);
  }

}
