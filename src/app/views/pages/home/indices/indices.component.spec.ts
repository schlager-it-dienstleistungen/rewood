import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IndicesComponent } from './indices.component';

describe('IndicesComponent', () => {
  let component: IndicesComponent;
  let fixture: ComponentFixture<IndicesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
