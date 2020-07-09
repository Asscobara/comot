import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderConstrcutionComponent } from './under-constrcution.component';

describe('UnderConstrcutionComponent', () => {
  let component: UnderConstrcutionComponent;
  let fixture: ComponentFixture<UnderConstrcutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnderConstrcutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderConstrcutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
