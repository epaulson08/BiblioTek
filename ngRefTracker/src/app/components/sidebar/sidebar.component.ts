import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() chosenPalette: string;
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
