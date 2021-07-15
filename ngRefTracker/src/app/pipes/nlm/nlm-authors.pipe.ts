import { Pipe, PipeTransform } from '@angular/core';
import { Author } from 'src/app/models/author';
import { NlmAuthorPipe } from './nlm-author.pipe';

@Pipe({
  name: 'nlmAuthors'
})
export class NlmAuthorsPipe implements PipeTransform {

  transform(authors: Author[]): string {
    let outputStr: string = "";
    let authPipe = new NlmAuthorPipe();

    // One author:
    if (authors.length === 1) {
      return authPipe.transform(authors[0]);
    }

    // 2-6 authors:
    else if (authors.length <= 6) {
      for (let i: number = 0; i < authors.length; i++) {
        outputStr += authPipe.transform(authors[i]);
        if (i < authors.length - 1) {
          outputStr += ", ";
        }
        else {
          outputStr += ".";
        }
      }
    }

    // > 6 authors:
    else {
      // i == 7 is for "et al."
      for (let i: number = 0; i < 7; i++) {
        outputStr += authPipe.transform(authors[i]);
        if (i < 6) {
          outputStr += ", "
        }
        else {
          outputStr += "et al."
        }
      }
    }
    return outputStr;
  }

  // https://www.nlm.nih.gov/bsd/uniform_requirements.html

  /*
1. Standard journal article

Halpern SD, Ubel PA, Caplan AL. Solid-organ transplantation in HIV-infected patients. N Engl J Med. 2002 Jul 25;347(4):284-7.

List the first six authors, followed by et al. If there are more than six authors, list the first six authors, followed by et al. (Note: NLM now lists all authors.):

Rose ME, Huerbin MB, Melick J, Marion DW, Palmer AM, Schiding JK, et al. Regulation of interstitial excitatory amino acid concentrations after cortical contusion injury. Brain Res. 2002;935(1-2):40-6.

Optional: If a journal carries continuous pagination throughout a volume (as many medical journals do), omit the month and issue number.

Halpern SD, Ubel PA, Caplan AL. Solid-organ transplantation in HIV-infected patients. N Engl J Med. 2002;347:284-7.

  */

}
