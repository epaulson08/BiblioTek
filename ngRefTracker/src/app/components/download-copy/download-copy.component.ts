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

  public test() {
    console.log("hi");
    // var htmlToRtf = require('html-to-rtf');
  let doc: Document = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun(
                    document.querySelector("#testing123").innerHTML)
              ],
            }),
          ],
        },
      ],
    });
       Packer.toBlob(doc).then(blob => {
          saveAs(blob, "my-refs.docx");
        });

  }


  // doc: Document = new Document({
  //   sections: [
  //     {
  //       properties: {},
  //       children: [
  //         new Paragraph({
  //           children: [
  //             new TextRun("testing\n"),
  //             new TextRun({
  //               text: "1",
  //               italics: true,
  //             }),
  //             new TextRun({
  //               text: "2",
  //               bold: true,
  //             }),
  //           ],
  //         }),
  //       ],
  //     },
  //   ],
  // });



  // public downloadDocx(): void {
  //   Packer.toBlob(this.doc).then(blob => {
  //     saveAs(blob, "my-refs.docx");
  //   });
  // }

  // public copyToClipboard(): void {
  //   let renderedText = document.querySelector("#someText").innerHTML;
  //   let type = "text/strings";
  //   let blob = new Blob(["testing"], { type });
  //   let clipboardItem = [new ClipboardItem({ type: blob })];
  //   new Clipboard().write(clipboardItem).then(
  //     function () { console.log("success")},
  //     function () { console.log("failure")}
  //   );
  // }
}
