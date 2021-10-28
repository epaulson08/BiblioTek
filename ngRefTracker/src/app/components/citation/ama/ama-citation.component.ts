import { Component, Input, OnInit } from '@angular/core';
import { JournalArticle } from 'src/app/models/journal-article';

@Component({
  selector: 'app-ama-citation',
  templateUrl: './ama-citation.component.html',
  styleUrls: ['./ama-citation.component.css']
})
export class AmaCitationComponent implements OnInit {

  @Input() ja: JournalArticle;

  constructor() { }

  ngOnInit(): void {
  }

}
