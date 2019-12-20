import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { Product } from '../shared/product';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ProductStoreService } from '../shared/product-store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchProducts } from '../shared/search-products';
import { Subject } from 'rxjs';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';

@Component({
	selector: 'sw-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, AfterViewInit {
	// Paginator
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	// Sort
	@ViewChild(MatSort, {static: true}) sort: MatSort;

	// Input
	@Input() products: Product[];
	@Input() dataSource: MatTableDataSource<Product>;

	// Export
	category: string;

	// Table Fields
	displayedColumns = ['picture', 'subcategory', 'title', 'measure', 'amount', 'description', 'status'];

	// Filter
	filterMeasureKeyUp$ = new Subject<string>();
	filterAmountKeyUp$ = new Subject<number>();

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private productService: ProductStoreService
	) { }

	ngOnInit() {
		const params = this.route.snapshot.paramMap;
		this.category = params.get('category');
		const searchInput: SearchProducts = {
			title: this.category
		};
		this.products = this.productService.searchProducts(searchInput);
		this.dataSource = new MatTableDataSource<Product>(this.products);

		this.filterMeasureKeyUp$.pipe(
			// filter(filterValue => filterValue.length >= 3),
			debounceTime(500),
			distinctUntilChanged(),
			// tap(() => this.isLoading = true),
			// switchMap(filterValue => this.filterEvent.emit(filterValue))
			// tap(() => this.isLoading = false)
		).subscribe(filterValue => this.filterProdutsByMeasure(filterValue));

		this.filterAmountKeyUp$.pipe(
			// filter(filterValue => filterValue.length >= 3),
			debounceTime(500),
			distinctUntilChanged(),
			// tap(() => this.isLoading = true),
			// switchMap(filterValue => this.filterEvent.emit(filterValue))
			// tap(() => this.isLoading = false)
		).subscribe(filterValue => this.filterProdutsByAmount(filterValue));
	}

	/**
  * Set the paginator and sort after the view init since this component will
  * be able to query its view for the initialized paginator and sort.
  */
	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	filterProdutsByMeasure($event) {
		this.dataSource.filterPredicate =
			(data: Product, filter: string) => data.measure.indexOf(filter) !== -1;
		this.dataSource.filter = '' + $event;
	}

	filterProdutsByAmount($event) {
		this.dataSource.filterPredicate = (
			data: Product, filter: string) => (('' + data.amount).indexOf(filter) !== -1
		);
		this.dataSource.filter = '' + $event;
	}

	selectedProduct(id) {
		this.router.navigate(['..', 'product', id], { relativeTo: this.route});
	}

	/* UI */
	/**
	 * Returns status string
	 *
	 * @param status: number
	 */
	getItemStatusString(status: number = 0): string {
		return this.productService.getItemStatusString(status);
	}

	/**
	 * Returns CSS Class by status
	 *
	 * @param status: number
	 */
	getItemCssClassByStatus(status: number = 0): string {
		return this.productService.getItemCssClassByStatus(status);
	}
}
