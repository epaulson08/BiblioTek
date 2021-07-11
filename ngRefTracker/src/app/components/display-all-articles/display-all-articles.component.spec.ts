import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAllArticlesComponent } from './display-all-articles.component';

describe('ListAllComponent', () => {
  let component: DisplayAllArticlesComponent;
  let fixture: ComponentFixture<DisplayAllArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayAllArticlesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayAllArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
