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
  @Input() articlesToDisplay: JournalArticle[];
  @Input() myCollectionView: boolean;
  showOneArticle: boolean = false;
  chosenPalette: string;

  constructor(
    private router: Router
    ) { }

  ngOnInit(): void {
    this.chosenPalette = localStorage.getItem("chosenPalette");
    if (!this.chosenPalette) this.chosenPalette = '-A';
   }

  goTo(id: number) {
    this.router.navigateByUrl(`show-article/${id}`);
  }

}
