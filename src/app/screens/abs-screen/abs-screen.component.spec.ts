import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsScreenComponent } from './abs-screen.component';

describe('AbsScreenComponent', () => {
  let component: AbsScreenComponent;
  let fixture: ComponentFixture<AbsScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbsScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
