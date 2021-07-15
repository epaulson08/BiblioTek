import { Pipe, PipeTransform } from '@angular/core';
import { JournalArticle } from 'src/app/models/journal-article';

@Pipe({
  name: 'fullNlm'
})
export class FullNlmPipe implements PipeTransform {

  transform(ja: JournalArticle): string {
    let outputStr: string = "";



    return outputStr;
  }

}
