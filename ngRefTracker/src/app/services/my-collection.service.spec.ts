import { TestBed } from '@angular/core/testing';

import { MyCollectionService } from './my-collection.service';

describe('MyCollectionService', () => {
  let service: MyCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
