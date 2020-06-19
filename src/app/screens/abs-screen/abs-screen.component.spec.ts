import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsScreenComponent } from './abs-screen.component';
import { IUser } from 'src/shceme/IScheme';
import { UsersComponent } from '../users/users.component';

describe('AbsScreenComponent', () => {
  let component: AbsScreenComponent<IUser>;
  let fixture: ComponentFixture<AbsScreenComponent<IUser>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbsScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create user component', () => {
    expect(component).toBeTruthy();
  });
});
