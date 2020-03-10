import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CredoComponent } from './credo.component';

describe('CredoComponent', () => {
  let component: CredoComponent;
  let fixture: ComponentFixture<CredoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CredoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
