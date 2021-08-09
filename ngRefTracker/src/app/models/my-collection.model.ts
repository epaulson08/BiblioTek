import { JournalArticle } from "./journal-article";

export class MyCollection {

  id: number;
  name: string;
  description: string;
  articles: JournalArticle[];

  constructor(id?: number) {
    if (id) this.id = id;
  }

}
