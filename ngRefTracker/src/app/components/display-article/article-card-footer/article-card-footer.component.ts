import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MyCollection } from 'src/app/models/my-collection.model';
import { MyCollectionService } from 'src/app/services/my-collection.service';

@Component({
  selector: 'app-article-card-footer',
  templateUrl: './article-card-footer.component.html',
  styleUrls: ['./article-card-footer.component.scss'],
})
export class ArticleCardFooterComponent implements OnInit {
  @Input() viewCite: boolean;
  @Output() viewCiteChange = new EventEmitter<boolean>();

  @Input() jaDeleted: boolean = false;
  @Output() jaDeletedChange = new EventEmitter<boolean>();

  @Input() editMode: boolean = false;
  @Output() editModeChange = new EventEmitter<boolean>();

  @Input() articleRemoved: boolean = false;
  @Output() articleRemovedChange = new EventEmitter<boolean>();

  @Input() submitEdit: boolean = false;
  @Output() submitEditChange = new EventEmitter<boolean>();

  @Input() chosenPalette: string;

  @Input() myCollectionView: boolean;

  myCollections: MyCollection[];
  addedMessage: boolean = false;

  constructor(private collServ: MyCollectionService, private router: Router) {}

  ngOnInit(): void {
    if (!this.myCollectionView) this.loadMyCollections();
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

  setEditMode(isOn : boolean) {
    this.editMode = isOn;
    this.editModeChange.emit(isOn);
  }

  deleteJa() {
    this.jaDeleted = true;
    this.jaDeletedChange.emit(true);
  }

  removeFromCollection() {
    this.articleRemoved = true;
    this.articleRemovedChange.emit(true);
  }

  clickedSubmit() {
    this.submitEdit = true;
    this.submitEditChange.emit(true);
  }

}
