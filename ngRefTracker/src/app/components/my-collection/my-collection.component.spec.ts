import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/services/auth.service';
import { MyCollectionComponent } from './my-collection.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MyCollection } from 'src/app/models/my-collection.model';
import { MyCollectionService } from 'src/app/services/my-collection.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';

describe('MyCollectionComponent', () => {
  let component: MyCollectionComponent;
  let fixture: ComponentFixture<MyCollectionComponent>;
  let collServStub: Partial<MyCollectionService>;
  let authServStub: Partial<AuthService>;

  beforeEach(async () => {
    // service stubs
    collServStub = {

      findByIdAsUser(id: number): Observable<MyCollection> {
        let coll: MyCollection = new MyCollection();
        let obs: Observable<MyCollection> = new Observable((observer) => {
          observer.next(coll);
          observer.complete();
        });
        return obs;
      }
    }

    authServStub = {
      checkLogin() { return true; }
    };

    // TestBed config
    await TestBed.configureTestingModule({
      providers: [ MyCollectionComponent,
        { provide: AuthService, useValue: authServStub },
        { provide: MyCollectionService, useValue: collServStub } ],
      declarations: [ MyCollectionComponent ],
      imports: [ RouterTestingModule] // FIXME add routes, examples at
        // https://angular.io/api/router/testing/RouterTestingModule#description
      })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    let authServ: AuthService = fixture.debugElement.injector.get(AuthService);
    let collServ: MyCollectionService = fixture.debugElement.injector.get(MyCollectionService);
    let route: ActivatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
    let router: Router = fixture.debugElement.injector.get(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
