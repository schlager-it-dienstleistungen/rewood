import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SearchProducts } from '../shared/search-products';

@Component({
	selector: 'sw-search-products',
	templateUrl: './search-products.component.html',
	styleUrls: ['./search-products.component.scss']
})
export class SearchProductsComponent implements OnInit {
	// Reset Search Form
	@Output() resetProductsEvent = new EventEmitter();
	// Search Products
	@Output() searchProductsEvent = new EventEmitter<SearchProducts>();

	// Search
	searchForm: FormGroup;

	constructor(private fb: FormBuilder) { }

	ngOnInit() {
		this.initForm();
	}

	private initForm() {
		this.searchForm = this.fb.group({
			title: [''],
			category: [''],
			price_from: [''],
			price_to: ['']
		});
	}

	/**
	 * Search Products
	 */
	searchProducts() {
		const searchValues = this.searchForm.value;
		const searchInput: SearchProducts = {
			title: searchValues.title,
			category: searchValues.category,
			subcategory: searchValues.subcategory, // TODO
			price_from: searchValues.price_from,
			price_to: searchValues.price_to,
			description: searchValues.description // TODO
		};

		this.searchProductsEvent.emit(searchValues);
	}

	/**
	 * Reset Search Formular
	 */
	resetSearchForm() {
		this.initForm();
		this.resetProductsEvent.emit();
	}
}
