import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserRolesListComponent } from './user-roles-list.component';

describe('UserRolesListComponent', () => {
  let component: UserRolesListComponent;
  let fixture: ComponentFixture<UserRolesListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRolesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRolesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
