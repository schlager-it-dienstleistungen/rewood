import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { ProductStoreService } from '../../shared/product-store.service';
import { Product } from '../../shared/product';

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

	dataSource: MatTableDataSource<Product>;
	isLoading = false;

	// Category
	category: string;

	// Table Fields
	displayedColumns = ['picture', 'title', 'quantity', 'price', 'description', 'status'];

	// Filter
	filterQuantityKeyUp$ = new Subject<number>();

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private productService: ProductStoreService
	) { }

	ngOnInit() {
		this.isLoading = true;
		const params = this.route.snapshot.paramMap;
		this.category = params.get('category');
	}

	/**
  * Set the paginator and sort after the view init since this component will
  * be able to query its view for the initialized paginator and sort.
  */
	ngAfterViewInit() {
		this.productService.getProductsToCategory(this.category).subscribe(data => {
			this.isLoading = false;
			this.dataSource = new MatTableDataSource<Product>(data);
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;
		});

		this.filterQuantityKeyUp$.pipe(
			// filter(filterValue => filterValue.length >= 3),
			debounceTime(500),
			distinctUntilChanged(),
			// tap(() => this.isLoading = true),
			// switchMap(filterValue => this.filterEvent.emit(filterValue))
			// tap(() => this.isLoading = false)
		).subscribe(filterValue => this.filterProdutsByQuantity(filterValue));
	}

	filterProdutsByQuantity($event) {
		this.dataSource.filterPredicate = (
			data: Product, filter: string) => (('' + data.dimension.quantity).indexOf(filter) !== -1
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

	firstPicture(product: Product) {
		return product.pictures[0];
	}
}
