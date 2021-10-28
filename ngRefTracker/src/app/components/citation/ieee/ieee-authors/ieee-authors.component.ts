import { Component, Input, OnInit } from '@angular/core';
import { Author } from 'src/app/models/author';
import { IeeeAuthorPipe } from 'src/app/pipes/ieee/author-builder/ieee-author.pipe';

@Component({
  selector: 'app-ieee-authors',
  templateUrl: './ieee-authors.component.html',
  styleUrls: ['./ieee-authors.component.css'],
})
export class IeeeAuthorsComponent implements OnInit {
  @Input() authors: Author[];

  constructor() {}

  ngOnInit(): void {}
}
