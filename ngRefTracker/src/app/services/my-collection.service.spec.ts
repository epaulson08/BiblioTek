import { TestBed } from '@angular/core/testing';
import { MyCollectionService } from './my-collection.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MyCollection } from '../models/my-collection.model';

describe('MyCollectionService', () => {
  let service: MyCollectionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MyCollectionService]
    });
    service = TestBed.inject(MyCollectionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    service = null;
    httpMock = null;
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#findAllAsUser', () => {
    it('should return an Observable<MyCollection[]> of expected length', () => {
      const dummyColls = [
        new MyCollection(1),
        new MyCollection(2)
      ];

      service.findAllAsUser().subscribe(myColls => {
        expect(myColls.length).toBe(2);
        expect(myColls).toEqual(dummyColls);
      });

      const req = httpMock.expectOne(`${service.baseUrl}api/collections/`);
      expect(req.request.method).toBe("GET");
      req.flush(dummyColls);
    }
    );
  });

});
