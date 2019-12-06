import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductWithSearchComponent } from './product-with-search.component';

describe('ProductWithSearchComponent', () => {
	let component: ProductWithSearchComponent;
	let fixture: ComponentFixture<ProductWithSearchComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ProductWithSearchComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProductWithSearchComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
