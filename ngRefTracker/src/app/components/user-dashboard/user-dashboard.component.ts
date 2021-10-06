import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

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
    private userServ: UserService
  ) { }

  ngOnInit(): void {
    this.authServ.guardRoute();
    this.chosenPalette = this.userServ.loadPalette();
  }

  choosePalette(choice: string) {
    this.chosenPalette = "-" + choice;
    localStorage.setItem("chosenPalette", this.chosenPalette);
  }

  clickCiteButton() {
    this.clickedCite = true;
  }
}
