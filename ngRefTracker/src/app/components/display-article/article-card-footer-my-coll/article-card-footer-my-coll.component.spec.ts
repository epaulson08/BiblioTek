import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCardFooterMyCollComponent } from './article-card-footer-my-coll.component';

describe('ArticleCardFooterMyCollComponent', () => {
  let component: ArticleCardFooterMyCollComponent;
  let fixture: ComponentFixture<ArticleCardFooterMyCollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleCardFooterMyCollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCardFooterMyCollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
