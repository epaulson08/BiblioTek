import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCardFooterComponent } from './article-card-footer.component';

describe('ArticleCardFooterComponent', () => {
  let component: ArticleCardFooterComponent;
  let fixture: ComponentFixture<ArticleCardFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleCardFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCardFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
