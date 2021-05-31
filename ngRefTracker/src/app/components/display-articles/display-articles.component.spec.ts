import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayArticlesComponent } from './display-articles.component';

describe('DisplayArticlesComponent', () => {
  let component: DisplayArticlesComponent;
  let fixture: ComponentFixture<DisplayArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayArticlesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
