import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IeeeAuthorsComponent } from './ieee-authors.component';

describe('IeeeAuthorsComponent', () => {
  let component: IeeeAuthorsComponent;
  let fixture: ComponentFixture<IeeeAuthorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IeeeAuthorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IeeeAuthorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
