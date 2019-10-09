import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { Category } from '../shared/category';
import { ProductStoreService } from '../shared/product-store.service';

@Component({
	selector: 'sw-filter-products',
	templateUrl: './filter-products.component.html',
	styleUrls: ['./filter-products.component.scss']
})
export class FilterProductsComponent implements OnInit {
	// Filter in all fields
	@Output() filterTextEvent = new EventEmitter<string>();
	filterKeyUp$ = new Subject<string>();

	// Filter Category
	filterCategoryControl = new FormControl('');
	@Output() filterCategoryEvent = new EventEmitter<string>();

	// Categories
	categories: Category[];

	constructor(
		private productService: ProductStoreService
	) { }

	ngOnInit() {
		this.categories = this.productService.getCategories();

		this.filterKeyUp$.pipe(
			// filter(filterValue => filterValue.length >= 3),
			debounceTime(500),
			distinctUntilChanged(),
			// tap(() => this.isLoading = true),
			// switchMap(filterValue => this.filterEvent.emit(filterValue))
			// tap(() => this.isLoading = false)
		).subscribe(filterValue => this.filterTextEvent.emit(filterValue));
		// .subscribe(books => this.foundBooks = books);

		this.filterCategoryControl.valueChanges.subscribe(filterCategory => this.filterCategoryEvent.emit(filterCategory));
	}

}
