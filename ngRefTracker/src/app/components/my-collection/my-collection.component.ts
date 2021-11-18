import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CitationStyle } from 'src/app/models/citation-style';
import { MyCollection } from 'src/app/models/my-collection.model';
import { AuthService } from 'src/app/services/auth.service';
import { CitationStyleService } from 'src/app/services/citation-style.service';
import { MyCollectionService } from 'src/app/services/my-collection.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-collection',
  templateUrl: './my-collection.component.html',
  styleUrls: ['./my-collection.component.scss'],
})
export class MyCollectionComponent implements OnInit {
  // init
  collId: number;
  coll: MyCollection;
  editedColl: MyCollection;
  chosenPalette: string;
  citationStyles: CitationStyle[];

  // ui
  editMode: boolean = false;
  listView: boolean = false;
  expandedView: boolean = true;
  showCiteAllUi: boolean = false;

  // methods
  // init
  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private collServ: MyCollectionService,
    private userServ: UserService,
    private csServ: CitationStyleService
  ) {}

  ngOnInit(): void {
    this.auth.guardRoute();
    this.chosenPalette = this.userServ.loadPalette();
    this.setExpandedView();
    this.collId = +this.route.snapshot.paramMap.get('collId');
    this.loadColl();
    this.loadCitationStyles();
    this.getEditRouteParam();
  }

  loadColl(): MyCollection {
    this.collServ.findByIdAsUser(this.collId).subscribe(
      (success) => {
        this.coll = success;
        this.editedColl = this.coll;
        return success;
      },
      (failure) => {
        console.error(failure);
      }
    );
    return null;
  }

  loadCitationStyles() {
    this.csServ.findAll().subscribe(
      (success) => {
        this.citationStyles = success;
        // alphabetize by abbreviation:
        this.citationStyles.sort((a, b) =>
          a.abbreviation.localeCompare(b.abbreviation)
        );
        return success;
      },
      (failure) => {
        console.error(failure);
      }
    );
    return null;
  }

  getEditRouteParam() {
    this.route.queryParamMap.pipe().subscribe((param) => {
      if (param.get('toEdit') === 'true') this.editMode = true;
      else this.editMode = false;
    });
  }

  // ui
  setListView(): void {
    this.listView = true;
    this.expandedView = false;
    this.showCiteAllUi = false;
  }

  setExpandedView(): void {
    this.expandedView = true;
    this.listView = false;
    this.showCiteAllUi = false;
  }

  setEditMode(setting: boolean): void {
    this.editMode = setting;
  }

  citeAll(): void {
    this.showCiteAllUi = true;
    this.listView = false;
    this.expandedView = false;
  }

  // CRUD
  updateMyCollection(updatedVersion: MyCollection) {
    this.collServ.update(this.collId, updatedVersion).subscribe(
      (success) => {
        this.coll = success;
        this.editMode = false;
      },
      (failure) => {
        console.error(failure);
      }
    );
  }
}
