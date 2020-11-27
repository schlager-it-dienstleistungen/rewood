import { TestBed } from '@angular/core/testing';

import { SupplierStoreService } from './supplier-store.service';

describe('SupplierStoreService', () => {
  let service: SupplierStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupplierStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
