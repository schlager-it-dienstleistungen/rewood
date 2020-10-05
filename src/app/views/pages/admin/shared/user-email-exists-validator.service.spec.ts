import { TestBed } from '@angular/core/testing';

import { UserEmailExistsValidatorService } from './user-email-exists-validator.service';

describe('UserEmailExistsValidatorService', () => {
  let service: UserEmailExistsValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserEmailExistsValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
