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
    private userServ: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.authServ.checkLogin()) this.router.navigateByUrl('home');
    this.loadPalette();
    console.log(this.chosenPalette);
  }

  loadPalette(): string {
    this.userServ.findPalette().subscribe(
      success => {
        this.chosenPalette = "-" + success;
        return success;
      },
      failure => {
        console.error(failure);
      });
    return null;
  }

  choosePalette(choice: string) {
    this.chosenPalette = "-" + choice;
  }

  clickCiteButton() {
    this.clickedCite = true;
  }
}
