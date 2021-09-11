import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  searchTerm: string = null;

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  search(): void {
    if (this.searchTerm !== null) {
      this.route.navigateByUrl('search/' + this.searchTerm);
    }
    else {
      this.route.navigateByUrl('search');
    }
  }

}
