import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  username: String = localStorage.getItem("username");
  clickedCite: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  clickCiteButton() {
    this.clickedCite = true;
  }
}
