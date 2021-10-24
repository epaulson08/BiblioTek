import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApaCitationComponent } from './apa-citation.component';


describe('ApaCitationComponent', () => {
  let component: ApaCitationComponent;
  let fixture: ComponentFixture<ApaCitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApaCitationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApaCitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
