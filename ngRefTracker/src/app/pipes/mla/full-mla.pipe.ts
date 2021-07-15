import { Pipe, PipeTransform } from '@angular/core';
import { JournalArticle } from 'src/app/models/journal-article';

@Pipe({
  name: 'fullMla'
})
export class FullMlaPipe implements PipeTransform {

  transform(ja: JournalArticle): string {
    let outputStr: string = "";



    return outputStr;
  }

}
