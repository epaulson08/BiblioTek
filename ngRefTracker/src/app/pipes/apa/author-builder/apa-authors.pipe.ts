import { Pipe, PipeTransform } from '@angular/core';
import { Author } from '../../../models/author';
import { AuthorEtAlHandlerPipe } from '../../author-et-al-handler.pipe';
import { ApaAuthorPipe } from './apa-author.pipe';

@Pipe({
  name: 'apaAuthors'
})
export class ApaAuthorsPipe implements PipeTransform {

  // https://owl.purdue.edu/owl/research_and_citation/apa_style/apa_formatting_and_style_guide/reference_list_articles_in_periodicals.html
  // Author, A. A., Author, B. B., & Author, C. C. (Year). Title of article. Title of Periodical, volume number(issue number), pages. https://doi.org/xx.xxx/yyyy

  // https://owl.purdue.edu/owl/research_and_citation/apa_style/apa_formatting_and_style_guide/reference_list_author_authors.html

  transform(authors: Author[]): string {
    let outputStr: string = "";
    authors = new AuthorEtAlHandlerPipe().transform(authors);

    if (authors.length === 0) return "";

    // SINGLE AUTHOR
    // Ahmed, S. (2012). On being included: Racism and diversity in institutional life. Duke University Press.
    else if (authors.length === 1) {
      return new ApaAuthorPipe()
        .transform(authors[0]);
    }

    // TWO AUTHORS
    // Soto, C. J., & John, O. P. (2017). The next big five inventory (BFI-2): Developing and assessing a hierarchical model with 15 facets to enhance bandwidth, fidelity, and predictive power. Journal of Personality and Social Psychology, 113(1), 117-143. http://dx.doi.org/10.1037/pspp0000096
    // THREE TO TWENTY AUTHORS
    // Nguyen, T., Carnevale, J. J., Scholer, A. A., Miele, D. B., & Fujita, K. (2019). Metamotivational knowledge of the role of high-level and low-level construal in goal-relevant task performance. Journal of Personality and Social Psychology, 117(5), 879-899. http://dx.doi.org/10.1037/pspa0000166
    else if (authors.length >= 2 && authors.length <= 20) {
      for (let i = 0; i < authors.length; i++) {
        if (i === authors.length - 1) {
          outputStr += "& "
        }

        outputStr += new ApaAuthorPipe()
          .transform(authors[i]);

        if (i !== authors.length - 1) {
          outputStr += ", ";
        }
      }
    }


    // MORE THAN TWENTY AUTHORS
    else if (authors.length > 20) {
      for (let i = 0; i < authors.length; i++) {
        if (i < 19) {
          outputStr += new ApaAuthorPipe().transform(authors[i]);
          outputStr += ", ";
        }
        if (i === authors.length - 1) {
          outputStr += " . . .  ";
          outputStr += new ApaAuthorPipe().transform(authors[i]);
        }
      }
    }

    else return "";

    return outputStr;
  }



}
