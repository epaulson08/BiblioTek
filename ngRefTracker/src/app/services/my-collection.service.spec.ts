import { getTestBed, TestBed } from '@angular/core/testing';
import { MyCollectionService } from './my-collection.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MyCollection } from '../models/my-collection.model';

describe('MyCollectionService', () => {
  let injector: TestBed;
  let service: MyCollectionService;
  let httpMock: HttpTestingController;

  // dummy data:
  let dummyCollId: number;
  let dummyColl: MyCollection;
  let dummyColls: MyCollection[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MyCollectionService]
    });
    injector = getTestBed();
    service = injector.inject(MyCollectionService);
    httpMock = injector.inject(HttpTestingController);

    // dummy data:
    dummyCollId = 1;
    dummyColl = new MyCollection(dummyCollId);
    dummyColls = [
      new MyCollection(2),
      new MyCollection(3)
    ];
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#findAllAsUser', () => {
    it('should return the expected Observable<MyCollection[]>', () => {
      service.findAllAsUser().subscribe(myColls => {
        expect(myColls.length).toBe(2);
        expect(myColls).toEqual(dummyColls);
      }, error => {
        fail('Error in subscribe()');
      });

      const req = httpMock.expectOne(`${service.baseUrl}api/collections/`);
      expect(req.request.method).toBe("GET");
      req.flush(dummyColls);
    });
  });

  describe('#findByIdAsUser', () => {
    it('should return an Observable<MyCollection>', () => {
      service.findByIdAsUser(dummyCollId).subscribe(myColl => {
        expect(myColl).toEqual(dummyColl);
    }, error => {
      fail('Error in subscribe()');
    });

    const req = httpMock.expectOne(`${service.baseUrl}api/collections/${dummyCollId}`)
    expect(req.request.method).toBe("GET");
    req.flush(dummyColl);
  });
});
});
