import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadDocxComponent } from './download-docx.component';

describe('DownloadCopyComponent', () => {
  let component: DownloadDocxComponent;
  let fixture: ComponentFixture<DownloadDocxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadDocxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadDocxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
