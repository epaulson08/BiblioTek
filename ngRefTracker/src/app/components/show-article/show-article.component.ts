import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-show-article',
  templateUrl: './show-article.component.html',
  styleUrls: ['./show-article.component.scss']
})
export class ShowArticleComponent implements OnInit {

  articleId: number;
  chosenPalette: string;

  constructor(private auth: AuthService, private userServ: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.auth.guardRoute();
    this.articleId = +this.route.snapshot.paramMap.get('articleId');
    this.chosenPalette = this.userServ.loadPalette();
  }

}
