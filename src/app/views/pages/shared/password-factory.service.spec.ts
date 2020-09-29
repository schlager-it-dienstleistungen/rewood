import { TestBed } from '@angular/core/testing';

import { PasswordFactoryService } from './password-factory.service';

describe('PasswordFactoryService', () => {
  let service: PasswordFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
