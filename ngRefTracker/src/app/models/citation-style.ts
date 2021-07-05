import { CitationStyleLink } from "./citation-style-link";

export class CitationStyle {
  id: number;
  name: string;
  definitiveReference: string;
  definitiveReferenceUrl: string;
  abbreviation: string;
  links: CitationStyleLink[];
}
