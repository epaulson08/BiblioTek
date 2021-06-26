import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadCopyComponent } from './download-copy.component';

describe('DownloadCopyComponent', () => {
  let component: DownloadCopyComponent;
  let fixture: ComponentFixture<DownloadCopyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadCopyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
