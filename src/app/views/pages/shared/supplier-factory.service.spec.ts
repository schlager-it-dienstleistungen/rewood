import { TestBed } from '@angular/core/testing';

import { SupplierFactoryService } from './supplier-factory.service';

describe('SupplierFactoryService', () => {
  let service: SupplierFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupplierFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
