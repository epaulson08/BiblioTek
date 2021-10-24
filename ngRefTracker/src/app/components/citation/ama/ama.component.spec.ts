import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmaComponent } from './ama.component';

describe('AmaComponent', () => {
  let component: AmaComponent;
  let fixture: ComponentFixture<AmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
