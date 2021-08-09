import { TestBed } from '@angular/core/testing';
import { MyCollectionService } from './my-collection.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MyCollectionService', () => {
  let service: MyCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MyCollectionService]
    });
    service = TestBed.inject(MyCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
