import { TestBed } from '@angular/core/testing';
import { CitationStyleLinkService } from './citation-style-link.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CitationStyleLinkService', () => {
  let service: CitationStyleLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CitationStyleLinkService]
    });
    service = TestBed.inject(CitationStyleLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
