import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LatestProductsComponent } from './latest-products.component';

describe('LatestProductsComponent', () => {
  let component: LatestProductsComponent;
  let fixture: ComponentFixture<LatestProductsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
