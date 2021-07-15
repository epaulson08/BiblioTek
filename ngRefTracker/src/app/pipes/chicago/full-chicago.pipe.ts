import { Pipe, PipeTransform } from '@angular/core';
import { JournalArticle } from 'src/app/models/journal-article';

@Pipe({
  name: 'fullChicago'
})
export class FullChicagoPipe implements PipeTransform {

  transform(ja: JournalArticle): string {
    let outputStr: string = "";




    return outputStr;
  }

}
