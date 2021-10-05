import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  chosenPalette: string = localStorage.getItem("chosenPalette");
  username: string = localStorage.getItem("username");
  clickedCite: boolean = false;

  constructor(
    private authServ: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.warn("in ngOnInit()");
    this.chosenPalette = this.loadPalette();
    console.warn(localStorage.getItem("chosenPalette"));
    if (!this.authServ.checkLogin()) this.router.navigateByUrl('home');
    // this.loadPalette();
  }

  loadPalette(): string {
    this.authServ.findPalette().subscribe(
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
    localStorage.setItem("chosenPalette", this.chosenPalette);
  }

  clickCiteButton() {
    this.clickedCite = true;
  }
}
