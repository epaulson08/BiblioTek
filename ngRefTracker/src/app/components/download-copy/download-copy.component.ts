import { Component, OnInit } from '@angular/core';
import { Document, HeadingLevel, ImageRun, Packer, Paragraph, Table, TableCell, TableRow, TextRun, VerticalAlign } from 'docx';
import { saveAs } from "file-saver";


@Component({
  selector: 'app-download-copy',
  templateUrl: './download-copy.component.html',
  styleUrls: ['./download-copy.component.css']
})

// thanks to https://github.com/dolanmiu/docx/tree/master/demo

export class DownloadCopyComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  doc: Document = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun("testing\n"),
              new TextRun({
                text: "1",
                italics: true,
              }),
              new TextRun({
                text: "2",
                bold: true,
              }),
            ],
          }),
        ],
      },
    ],
  });

  public downloadDocx(): void {
    Packer.toBlob(this.doc).then(blob => {
      saveAs(blob, "my-refs.docx");
    });

  }
}
