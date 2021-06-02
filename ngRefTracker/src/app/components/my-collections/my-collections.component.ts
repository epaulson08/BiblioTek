import { Component, OnInit } from '@angular/core';
import { MyCollection } from 'src/app/models/my-collection.model';
import { AuthService } from 'src/app/services/auth.service';
import { MyCollectionService } from 'src/app/services/my-collection.service';

@Component({
  selector: 'app-my-collections',
  templateUrl: './my-collections.component.html',
  styleUrls: ['./my-collections.component.css']
})
export class MyCollectionsComponent implements OnInit {

  myCollections: MyCollection[];
  userId: number;
  myCollection: MyCollection;

  constructor(
    private collServ: MyCollectionService,
    private auth: AuthService
    ) { }

  ngOnInit(): void {
    this.auth.checkLogin();
    this.loadMyCollections(1); // FIXME: load collections by userId once User build complete
  }

  showMyCollection(cid: number): void {
    this.collServ.show(cid).subscribe(
      success => {
        this.myCollection = success;
        return success;
      },
      failure => {
        console.error(failure);
      });
    return null;
  }

  loadMyCollections(userId): void {
    // FIXME: load collections by userId once User build complete
    this.collServ.index().subscribe(
      success => {
        this.myCollections = success;
        return success;
      },
      failure => {
        console.error(failure);
      });
    return null;
  }

}
