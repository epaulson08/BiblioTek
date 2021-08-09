import { TestBed } from '@angular/core/testing';
import { JournalArticleService } from './journal-article.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('JournalArticleService', () => {
  let service: JournalArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JournalArticleService]
    });
    service = TestBed.inject(JournalArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
