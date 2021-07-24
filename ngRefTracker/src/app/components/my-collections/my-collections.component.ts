import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JournalArticle } from 'src/app/models/journal-article';
import { MyCollection } from 'src/app/models/my-collection.model';
import { AuthService } from 'src/app/services/auth.service';
import { MyCollectionService } from 'src/app/services/my-collection.service';

@Component({
  selector: 'app-my-collections',
  templateUrl: './my-collections.component.html',
  styleUrls: ['./my-collections.component.css']
})
export class MyCollectionsComponent implements OnInit {

  /////////
  // FIELDS

  // initialization
  allCollections: MyCollection[];
  userId: number;
  collJas: JournalArticle[];
  // UI
  myCollection: MyCollection;
  viewColl: MyCollection;
  underConstructionMessage: boolean = false;
  // CRUD


  //////////
  // METHODS

  // initialization
  constructor(
    private collServ: MyCollectionService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.auth.checkLogin()) this.router.navigateByUrl("home");
    this.loadMyCollections();
  }

  loadMyCollections(): void {
    this.collServ.findAllAsUser().subscribe(
      success => {
        this.allCollections = success;
        return success;
      },
      failure => {
        console.error(failure);
      });
    return null;
  }

  // UI
  viewMyCollection(coll: MyCollection): void {
    this.viewColl = coll;
  }

  editCollection(coll: MyCollection): void {
    this.underConstructionMessage = true;
    this.myCollection = coll;
  }

  citeAll(coll: MyCollection): void {
    this.underConstructionMessage = true;
    this.myCollection = coll;
  }

  // CRUD
  findMyCollectionByIdAsUser(myCollectionId: number): void {
    this.collServ.findByIdAsUser(myCollectionId).subscribe(
      success => {
        this.myCollection = success;
        return success;
      },
      failure => {
        console.error(failure);
      });
    return null;
  }

}
