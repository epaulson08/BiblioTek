import { TestBed } from '@angular/core/testing';

import { CitationStyleService } from './citation-style.service';

describe('CitationStyleService', () => {
  let service: CitationStyleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitationStyleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
