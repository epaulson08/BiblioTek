import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
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

  savePalette(choice: string): string {
    this.chosenPalette = "-" + choice;
    localStorage.setItem("chosenPalette", this.chosenPalette);
    this.userServ.savePalette(choice).subscribe(success => {
      return success;
    },
    failure => {
      console.error(failure);
    });
  return null;
  }

  previewPalette(choice: string) {
    this.chosenPalette = "-" + choice;
  }

  clickCiteButton() {
    this.clickedCite = true;
  }
}
