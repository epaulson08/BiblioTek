import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-show-article',
  templateUrl: './show-article.component.html',
  styleUrls: ['./show-article.component.css']
})
export class ShowArticleComponent implements OnInit {

  articleId: number;
  chosenPalette: string;

  constructor(private auth: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    if (!this.auth.checkLogin()) {
      this.router.navigateByUrl("home");
    }
    this.articleId = +this.route.snapshot.paramMap.get('articleId');
    this.chosenPalette = localStorage.getItem("chosenPalette");
    if (!this.chosenPalette) this.chosenPalette = '-A';
  }

}
