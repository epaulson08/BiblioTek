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

  collId: number;
  coll: MyCollection;

  constructor(private auth: AuthService, private route: ActivatedRoute, private router: Router, private collServ: MyCollectionService) { }

  ngOnInit(): void {
    if (!this.auth.checkLogin()) {
      this.router.navigateByUrl("home");
    }

    this.collId = +this.route.snapshot.paramMap.get('collId');
    this.loadColl();

  }

  loadColl(): void {
    this.collServ.show(this.collId).subscribe(
      success => {
        this.coll = success;
        console.log(this.coll);

        return success;
      },
      failure => {
        console.error(failure);
      });
  }
}
