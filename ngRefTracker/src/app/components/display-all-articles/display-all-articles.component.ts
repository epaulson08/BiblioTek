import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JournalArticle } from 'src/app/models/journal-article';
import { AuthService } from 'src/app/services/auth.service';
import { JournalArticleService } from 'src/app/services/journal-article.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-display-all-articles',
  templateUrl: './display-all-articles.component.html',
  styleUrls: ['./display-all-articles.component.scss']
})
export class DisplayAllArticlesComponent implements OnInit {

  // fields
  @Input() myCollectionView;
  journalArticles: JournalArticle[] = [];
  totalArticles: number;
  searchTerm: string;
  deleted: boolean = false;
  chosenPalette: string;

  // init
  constructor(
    private jaServ: JournalArticleService,
    private userServ: UserService,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.auth.guardRoute();
    this.chosenPalette = this.userServ.loadPalette();
    this.loadJournalArticles();
    localStorage.setItem("lastPage", "display-all-articles");
  }

  // CRUD
  loadJournalArticles(): JournalArticle[] {
    this.jaServ.index().subscribe(
      success => {
        this.journalArticles = success;
        this.totalArticles = this.journalArticles.length;
        return success;
      },
      failure => {
        console.error(failure);
      });
    return null;
  }

  // nav
  goTo(id: number): void {
    this.router.navigateByUrl('show-article/' + id);
  }

}
