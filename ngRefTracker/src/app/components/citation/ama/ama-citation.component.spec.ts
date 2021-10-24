import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmaCitationComponent } from './ama-citation.component';

describe('AmaComponent', () => {
  let component: AmaCitationComponent;
  let fixture: ComponentFixture<AmaCitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmaCitationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmaCitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
