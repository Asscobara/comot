import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsDialogComponent } from './alerts-dialog.component';

describe('AlertsDialogComponent', () => {
  let component: AlertsDialogComponent;
  let fixture: ComponentFixture<AlertsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
