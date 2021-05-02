import { Author } from "./author";
import { Journal } from "./journal";

export class JournalArticle {

  id: number;
  title: string;
  volumeNum: number;
  yearPublished: number;
  doi: string;
  journal: Journal;
  authors: Author[];

}
