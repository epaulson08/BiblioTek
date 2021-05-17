import { Component, OnInit } from '@angular/core';
import { MyCollection } from 'src/app/models/my-collection.model';
import { MyCollectionService } from 'src/app/services/my-collection.service';

@Component({
  selector: 'app-my-collections',
  templateUrl: './my-collections.component.html',
  styleUrls: ['./my-collections.component.css']
})
export class MyCollectionsComponent implements OnInit {

  myCollections : MyCollection[];
  userId : number;
  myCollection : MyCollection;

  constructor(private collServ : MyCollectionService) { }

  ngOnInit(): void {
    this.showMyCollection(1); // FIXME: Hardcoding userId = 1 pending User build
  }

  showMyCollection(userId) : void {
      this.collServ.show(userId).subscribe(
        success => {
          this.myCollection = success;
          return success;
        },
        failure => {
          console.error(failure);
        });
      return null;
    }

  // loadMyCollections(userId) : void {
  //     this.collServ.index().subscribe(
  //       success => {
  //         this.myCollections = success;
  //         return success;
  //       },
  //       failure => {
  //         console.error(failure);
  //       });
  //     return null;
  //   }

}
