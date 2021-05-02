import { JournalArticle } from "./journal-article";

export class Author {
  id : number;
  firstName : string;
  middleName: string;
  lastName: string;
  suffix: string;
  articles: JournalArticle[];
}
