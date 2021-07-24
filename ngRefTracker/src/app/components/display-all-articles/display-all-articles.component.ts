import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JournalArticle } from 'src/app/models/journal-article';
import { AuthService } from 'src/app/services/auth.service';
import { JournalArticleService } from 'src/app/services/journal-article.service';


@Component({
  selector: 'app-display-all-articles',
  templateUrl: './display-all-articles.component.html',
  styleUrls: ['./display-all-articles.component.css']
})
export class DisplayAllArticlesComponent implements OnInit {

  // fields
  journalArticles: JournalArticle[] = [];
  totalArticles: number;
  searchTerm: string;
  deleted: boolean = false;
  @Input() myCollectionView;

  // init
  constructor(
    private jaServ: JournalArticleService,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    if (!this.auth.checkLogin()) this.router.navigateByUrl("home");
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
