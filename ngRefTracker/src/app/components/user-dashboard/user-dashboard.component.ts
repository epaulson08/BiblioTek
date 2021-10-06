import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  // chosenPalette: string = localStorage.getItem("chosenPalette");
  chosenPalette: string;
  username: string = localStorage.getItem("username");
  clickedCite: boolean = false;

  constructor(
    private authServ: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // this.route.data.subscribe((res) => { this.chosenPalette = res.resolver; console.warn(res);});
  }

  ngOnInit(): void {
    console.warn("in ngOnInit()");
    if (!this.authServ.checkLogin()) this.router.navigateByUrl('home');
    // this.chosenPalette = this.route.snapshot.data["chosenPalette"];
    // this.chosenPalette = this.loadPalette();
    this.chosenPalette = localStorage.getItem("chosenPalette");
    if (!this.chosenPalette) this.chosenPalette = '-A';
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
