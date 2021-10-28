import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleIeeeAdjuster',
})
export class TitleIeeeAdjusterPipe implements PipeTransform {
  transform(title: string): string {
    // IEEE places a ',' at the end of title - will be handled in template
    // Remove '.' at end of title if present
    if (title.charAt(title.length - 1) === '.') {
      title.slice(title.length - 1);
    }

    return title;
  }
}
