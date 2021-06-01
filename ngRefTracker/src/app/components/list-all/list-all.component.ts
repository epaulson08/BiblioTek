import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JournalArticle } from 'src/app/models/journal-article';
import { JournalArticleService } from 'src/app/services/journal-article.service';


@Component({
  selector: 'app-list-all',
  templateUrl: './list-all.component.html',
  styleUrls: ['./list-all.component.css']
})
export class ListAllComponent implements OnInit {

  //////// fields
  journalArticles : JournalArticle[] = [];
  searchTerm : string;
  deleted : boolean = false;

  //////// init
  constructor(
    private jaServ: JournalArticleService,
    private router : Router
  ) {

  }
  ngOnInit(): void {
    this.loadJournalArticles();
    localStorage.setItem("lastPage", "listAll");
  }

  //////// CRUD
  loadJournalArticles(): JournalArticle[] {
    this.jaServ.index().subscribe(
      success => {
        this.journalArticles = success;
        return success;
      },
      failure => {
        console.error(failure);
      });
    return null;
  }

  //////// navigation:

  goTo(id : number) : void {
    this.router.navigateByUrl('show-article/' + id);
  }

}