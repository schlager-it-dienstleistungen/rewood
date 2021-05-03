import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CategoryLinkComponent } from './category-link.component';

describe('CategoryLinkComponent', () => {
  let component: CategoryLinkComponent;
  let fixture: ComponentFixture<CategoryLinkComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
