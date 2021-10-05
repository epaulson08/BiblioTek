import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageKeyList } from 'src/app/models/local-storage-key-list';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})

export class NaviComponent implements OnInit {

  @Input() chosenPalette: string;
  loggedIn: boolean = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.auth.checkLogin()) this.loggedIn = true;
    if (!this.chosenPalette) this.chosenPalette = "-A"
    console.log(this.chosenPalette);

  }

  logout() {
    LocalStorageKeyList.clear();
    this.auth.logout();
  }

}
