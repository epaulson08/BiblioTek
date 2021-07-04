import { TestBed } from '@angular/core/testing';

import { CitationStyleLinkService } from './citation-style-link.service';

describe('CitationStyleLinkService', () => {
  let service: CitationStyleLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitationStyleLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
