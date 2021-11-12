import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MyCollection } from 'src/app/models/my-collection.model';
import { MyCollectionService } from 'src/app/services/my-collection.service';

@Component({
  selector: 'app-article-card-footer',
  templateUrl: './article-card-footer.component.html',
  styleUrls: ['./article-card-footer.component.css'],
})
export class ArticleCardFooterComponent implements OnInit {
  @Input() viewCite: boolean;
  @Output() viewCiteChange = new EventEmitter<boolean>();
  @Input() chosenPalette: string;
  @Input() myCollectionView: boolean;
  myCollections: MyCollection[];

  constructor(private collServ: MyCollectionService, private router: Router) {}

  ngOnInit(): void {
    this.loadMyCollections();
  }

  clickCite(): void {
    this.viewCite = true;
    this.viewCiteChange.emit(this.viewCite);
  }

  resetCite(): void {
    this.viewCite = false;
    this.viewCiteChange.emit(this.viewCite);
  }

  loadMyCollections() {
    this.collServ.findAllAsUser().subscribe(
      (success) => {
        this.myCollections = success;
      },
      (failure) => {
        console.error(failure);
      }
    );
  }

  goBack(): void {
    let whereLast: string = localStorage.getItem('lastPage');
    if (whereLast === 'search') {
      this.router.navigateByUrl('search');
    } else if (whereLast === 'display-all-articles') {
      this.router.navigateByUrl('display-all-articles');
    } else {
      this.router.navigateByUrl('display-all-articles');
    }
  }
}
