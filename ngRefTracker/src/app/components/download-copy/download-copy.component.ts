import { TransitiveCompileNgModuleMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Document, HeadingLevel, ImageRun, Packer, Paragraph, Table, TableCell, TableRow, TextRun, VerticalAlign } from 'docx';
import { saveAs } from "file-saver";
import { Author } from 'src/app/models/author';
import { Journal } from 'src/app/models/journal';
import { JournalArticle } from 'src/app/models/journal-article';
import { ApaAuthorsPipe } from 'src/app/pipes/apa/apa-authors.pipe';

@Component({
  selector: 'app-download-copy',
  templateUrl: './download-copy.component.html',
  styleUrls: ['./download-copy.component.css']
})

// thanks to https://github.com/dolanmiu/docx/tree/master/demo

export class DownloadCopyComponent implements OnInit {
  testArticle: JournalArticle;

  constructor() {
  }

  ngOnInit(): void {
    this.createTestData();
  }

  save(citationStyle: string): void {
    // testing:
    // this.saveDocx(this.createTestDocx(citationStyle));

    // actual:
    switch(citationStyle) {
      case "apa":
        this.saveDocx(this.createApaDocx());
        break;
      case "ama":
        break;
      case "ieee":
        break;
      case "nlm":
        break;
      default:
        break;
    }

  }

  createApaDocx(): Document {
    // Part A: non-italic: [authors (year). Title.]
    // Part B: italic: [journal, vol,]
    // Part C: non-italic: [pp.]
    let authors: string = new ApaAuthorsPipe().transform(this.testArticle.authors);
    let partA: string = `${authors} (${this.testArticle.yearPublished}). ${this.testArticle.title}. `;
    let partB: string = `${this.testArticle.journal.name}, ${this.testArticle.volumeNum}, `;
    let partC: string = `${this.testArticle.pages}.`;

    return new Document({
      styles: {
        paragraphStyles: [
            {
              id: "default",
              name: "default",
              basedOn: "Normal",
              quickFormat: true,
              run: {
                font: "Calibri",
                size: 22  // halves font on save for unknown reasons
                // https://github.com/dolanmiu/docx/blob/master/demo/11-declaritive-styles-2.ts
              }
            }
        ]
      },
      sections: [
        {
          children: [
            new Paragraph({
              style: "default",
              children: [
                new TextRun({
                    text: partA
                }),
                new TextRun({
                    text: partB,
                    italics: true,
                }),
                new TextRun({
                    text: partC,
                })],
            }),
          ],
        },
      ],
    });
  }

  createTestDocx(citationStyle: string): Document {
    return new Document({
      styles: {
        paragraphStyles: [
            {
              id: "default",
              name: "default",
              basedOn: "Normal",
              quickFormat: true,
              run: {
                font: "Calibri",
                size: 22  // halves font on save for unknown reasons
                // https://github.com/dolanmiu/docx/blob/master/demo/11-declaritive-styles-2.ts
              }
            }
        ]
      },
      sections: [
        {
          children: [
            new Paragraph({
              style: "default",
              children: [
                new TextRun({
                    text: "ipsum",

                })],
            }),
          ],
        },
      ],
    });
  }

  saveDocx(docToSave: Document) {
    Packer.toBlob(docToSave).then(blob => {
      saveAs(blob, "my-refs.docx");
    });
  }

  createTestData() {
    this.testArticle = new JournalArticle();
    this.testArticle.title = "Clinical outcomes of patients seen by rapid response teams: a template for benchmarking international teams";
    this.testArticle.volumeNum = 107;
    this.testArticle.yearPublished = 2016;
    this.testArticle.doi = "http://dx.doi.org/10.1016/j.resuscitation.2016.07.001";
    this.testArticle.journal = new Journal();
    this.testArticle.journal.name = "Resuscitation";
    this.testArticle.authors = [
          {
              "id": 9,
              "firstName": "D",
              "middleName": "H",
              "lastName": "Chong",
              "suffix": "",
              "articles": []
          },
          {
              "id": 10,
              "firstName": "J",
              "middleName": "",
              "lastName": "Bannard-Smith",
              "suffix": "",
              "articles": []
          },
          {
              "id": 11,
              "firstName": "G",
              "middleName": "K",
              "lastName": "Lighthall",
              "suffix": "",
              "articles": []
          },
          {
              "id": 12,
              "firstName": "C",
              "middleName": "P",
              "lastName": "Subbe",
              "suffix": "",
              "articles": []
          },
          {
              "id": 13,
              "firstName": "L",
              "middleName": "",
              "lastName": "Durham",
              "suffix": "",
              "articles": []
          },
          {
              "id": 14,
              "firstName": "J",
              "middleName": "",
              "lastName": "Welch",
              "suffix": "",
              "articles": []
          },
          {
              "id": 15,
              "firstName": "R",
              "middleName": "",
              "lastName": "Bellomo",
              "suffix": "",
              "articles": []
          }
      ];
      this.testArticle.pages = "7-12";
      this.testArticle.issueNum = null;
    }
  }
