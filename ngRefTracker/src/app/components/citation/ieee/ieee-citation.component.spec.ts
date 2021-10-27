import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IeeeCitationComponent } from './ieee-citation.component';

describe('IeeeCitationComponent', () => {
  let component: IeeeCitationComponent;
  let fixture: ComponentFixture<IeeeCitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IeeeCitationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IeeeCitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
