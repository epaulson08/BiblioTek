import { Component, Input, OnInit } from '@angular/core';
import { LocalStorageKeyList } from 'src/app/models/local-storage-key-list';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})

export class NaviComponent implements OnInit {

  chosenPalette: string;
  loggedIn: boolean = false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    if (this.auth.checkLogin()) this.loggedIn = true;
    this.chosenPalette = localStorage.getItem("chosenPalette");
    if (!this.chosenPalette) this.chosenPalette = "-A"
  }

  logout() {
    LocalStorageKeyList.clear();
    this.auth.logout();
  }

}
