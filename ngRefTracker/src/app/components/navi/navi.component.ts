import { NgLocaleLocalization } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LocalStorageKeyList } from 'src/app/models/local-storage-key-list';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  logout() {
    LocalStorageKeyList.clear();
    this.auth.logout();
  }

}
