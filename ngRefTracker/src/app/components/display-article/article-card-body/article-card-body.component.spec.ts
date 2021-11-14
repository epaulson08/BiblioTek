import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCardBodyComponent } from './article-card-body.component';

describe('ArticleCardBodyComponent', () => {
  let component: ArticleCardBodyComponent;
  let fixture: ComponentFixture<ArticleCardBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleCardBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCardBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
