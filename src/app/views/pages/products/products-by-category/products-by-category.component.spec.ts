import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductsByCategoryComponent } from './products-by-category.component';

describe('ProductsByCategoryComponent', () => {
  let component: ProductsByCategoryComponent;
  let fixture: ComponentFixture<ProductsByCategoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsByCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
