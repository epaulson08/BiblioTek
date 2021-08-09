import { TestBed } from '@angular/core/testing';
import { CitationStyleService } from './citation-style.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CitationStyleService', () => {
  let service: CitationStyleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CitationStyleService]
    });
    service = TestBed.inject(CitationStyleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
