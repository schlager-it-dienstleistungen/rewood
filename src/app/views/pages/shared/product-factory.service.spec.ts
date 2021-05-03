import { TestBed } from '@angular/core/testing';

import { ProductFactoryService } from './product-factory.service';

describe('ProductFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductFactoryService = TestBed.inject(ProductFactoryService);
    expect(service).toBeTruthy();
  });
});
