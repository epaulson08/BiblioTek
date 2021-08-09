import { TestBed } from '@angular/core/testing';
import { JournalService } from './journal.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('JournalService', () => {
  let service: JournalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JournalService]
    });
    service = TestBed.inject(JournalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
