import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitationStyleSwitchComponent } from './citation-style-switch.component';

describe('CitationStyleSwitchComponent', () => {
  let component: CitationStyleSwitchComponent;
  let fixture: ComponentFixture<CitationStyleSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitationStyleSwitchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitationStyleSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
