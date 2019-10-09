import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLayoutItemComponent } from './card-layout-item.component';

describe('CardLayoutItemComponent', () => {
  let component: CardLayoutItemComponent;
  let fixture: ComponentFixture<CardLayoutItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardLayoutItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardLayoutItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
