import { Component, Input, OnInit } from '@angular/core';
import { Document, Packer } from 'docx';
import { saveAs } from "file-saver";
import { CitationStyle } from 'src/app/models/citation-style';
import { JournalArticle } from 'src/app/models/journal-article';
import { AmaDocxPipe } from 'src/app/pipes/ama/docx-builder/ama-docx.pipe';
import { ApaDocxPipe } from 'src/app/pipes/apa/docx-builder/apa-docx.pipe';
import { IeeeDocxPipe } from 'src/app/pipes/ieee/ieee-docx.pipe';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-download-docx',
  templateUrl: './download-docx.component.html',
  styleUrls: ['./download-docx.component.css']
})

// thanks to https://github.com/dolanmiu/docx/tree/master/demo

export class DownloadDocxComponent implements OnInit {
  @Input() docxCitationStyle: CitationStyle;
  @Input() articlesToCite: JournalArticle[];
  chosenPalette: string;

  constructor(private userServ: UserService) { }

  ngOnInit(): void {
    this.chosenPalette = this.userServ.loadPalette();
  }

  downloadDocx(): void {
    switch(this.docxCitationStyle.abbreviation) {
      case "APA":
        this.saveDocx(new ApaDocxPipe().transform(this.articlesToCite));
        break;
      case "AMA":
        this.saveDocx(new AmaDocxPipe().transform(this.articlesToCite));
        break;
      case "Chicago":
        // TODO
      case "IEEE":
        this.saveDocx(new IeeeDocxPipe().transform(this.articlesToCite));
        break;
      case "NLM":
        // TODO
        break;
      default:
        // TODO
        break;
    }
  }

  saveDocx(docToSave: Document) {
    Packer.toBlob(docToSave).then(blob => {
      saveAs(blob, "my-refs.docx");
    });
  }
}
