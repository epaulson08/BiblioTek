import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleValidator',
})
export class TitleValidatorPipe implements PipeTransform {
  transform(title: string): string {
    // Handle punctuation at end of title.
    if (title.charAt(title.length-1) !== '.' && title.charAt(title.length-1) !== '?') {
      title += '.';
    }

    return title;
  }
}
