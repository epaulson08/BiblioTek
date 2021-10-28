import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiteAllUiComponent } from './cite-all-ui.component';

describe('CiteAllUiComponent', () => {
  let component: CiteAllUiComponent;
  let fixture: ComponentFixture<CiteAllUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CiteAllUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CiteAllUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
