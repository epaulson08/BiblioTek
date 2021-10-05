import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  chosenPalette: string;
  username: string = localStorage.getItem("username");
  clickedCite: boolean = false;

  constructor(
    private authServ: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.authServ.checkLogin()) this.router.navigateByUrl('home');
    this.chosenPalette = '-A';
  }

  choosePalette(choice: string) {
    this.chosenPalette = "-" + choice;
  }
  clickCiteButton() {
    this.clickedCite = true;
  }
}
