import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { JournalArticle } from 'src/app/models/journal-article';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-display-articles',
  templateUrl: './display-articles.component.html',
  styleUrls: ['./display-articles.component.scss']
})
export class DisplayArticlesComponent implements OnInit {
  @Input() articlesToDisplay: JournalArticle[];
  @Input() myCollectionView: boolean;
  showOneArticle: boolean = false;
  chosenPalette: string;

  constructor(
    private router: Router,
    private userServ: UserService
    ) { }

  ngOnInit(): void {
    this.chosenPalette = this.userServ.loadPalette();
   }

  goTo(id: number) {
    this.router.navigateByUrl(`show-article/${id}`);
  }

}
