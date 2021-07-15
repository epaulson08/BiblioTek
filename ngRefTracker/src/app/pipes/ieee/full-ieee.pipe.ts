import { Pipe, PipeTransform } from '@angular/core';
import { JournalArticle } from 'src/app/models/journal-article';

@Pipe({
  name: 'fullIeee'
})
export class FullIeeePipe implements PipeTransform {

  transform(ja: JournalArticle): string {
    let outputStr: string = "";



    return outputStr;
  }

}
