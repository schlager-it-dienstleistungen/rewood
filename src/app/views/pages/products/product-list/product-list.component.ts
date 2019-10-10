import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Product } from '../shared/product';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ProductStoreService } from '../shared/product-store.service';

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

	// Table Fields
	displayedColumns = ['picture', 'title', 'category', 'subcategory', 'price', 'description', 'status'];
	products: Product[];
	dataSource: MatTableDataSource<Product>;

	constructor(
		private productService: ProductStoreService
	) { }

	ngOnInit() {
		this.products = this.productService.getAllProducts();
		this.dataSource = new MatTableDataSource<Product>(this.products);
	}

 /**
  * Set the paginator and sort after the view init since this component will
  * be able to query its view for the initialized paginator and sort.
  */
	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	filterProducts($event) {
		this.dataSource.filterPredicate = (
			data: Product, filter: string) => (data.title.indexOf(filter) !== -1 && data.description.indexOf(filter) !== -1
		);
		this.dataSource.filter = '' + $event;
	}

	filterProductsWithCategory($event) {
		const filterCategory = '' + $event;
		this.dataSource.filterPredicate = (data: Product, filter: string) => data.category.indexOf(filter) !== -1;
		this.dataSource.filter = filterCategory;
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
