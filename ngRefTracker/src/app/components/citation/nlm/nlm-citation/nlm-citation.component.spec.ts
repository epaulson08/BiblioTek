import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NlmCitationComponent } from './nlm-citation.component';

describe('NlmCitationComponent', () => {
  let component: NlmCitationComponent;
  let fixture: ComponentFixture<NlmCitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NlmCitationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NlmCitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
