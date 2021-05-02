import { TestBed } from '@angular/core/testing';

import { JournalArticleService } from './journal-article.service';

describe('JournalArticleService', () => {
  let service: JournalArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JournalArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
