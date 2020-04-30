import { TestBed } from '@angular/core/testing';

import { CategoryFactoryService } from './category-factory.service';

describe('CategoryFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoryFactoryService = TestBed.get(CategoryFactoryService);
    expect(service).toBeTruthy();
  });
});
