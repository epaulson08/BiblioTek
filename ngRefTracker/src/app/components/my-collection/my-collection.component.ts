import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyCollection } from 'src/app/models/my-collection.model';
import { AuthService } from 'src/app/services/auth.service';
import { MyCollectionService } from 'src/app/services/my-collection.service';

@Component({
  selector: 'app-my-collection',
  templateUrl: './my-collection.component.html',
  styleUrls: ['./my-collection.component.css']
})
export class MyCollectionComponent implements OnInit {

  /////////
  // FIELDS

  // initialization
  collId: number;
  coll: MyCollection;

  // UI
  listView: boolean = false;
  expandedView: boolean = true;
  editView: boolean = false;

  // CRUD
  editedMyCollection: MyCollection;

  //////////
  // METHODS

  // initialization
  constructor(private auth: AuthService, private route: ActivatedRoute, private router: Router, private collServ: MyCollectionService) { }

  ngOnInit(): void {
    if (!this.auth.checkLogin()) {
      this.router.navigateByUrl("home");
    }
    this.setExpandedView();
    this.collId = +this.route.snapshot.paramMap.get('collId');
    this.loadColl();
  }

  loadColl(): MyCollection {
    this.collServ.findByIdAsUser(this.collId).subscribe(
      success => {
        this.coll = success;
        this.editedMyCollection = success;
        return success;
      },
      failure => {
        console.error(failure);
      });
      return null;
  }

  // UI
  setListView(): void {
    this.listView = true;
    this.expandedView = false;
  }

  setExpandedView(): void {
    this.expandedView = true;
    this.listView = false;
  }

  showEditView(): void {
    this.editView = true;
  }

  // CRUD
  updateMyCollection(updatedVersion: MyCollection) {
    this.collServ.update(this.collId, updatedVersion).subscribe(
      success => {
        this.coll = success;
      },
      failure => {
        console.error(failure);
      }
    )
  }

}
