import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Product } from '../shared/product';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ProductStoreService } from '../shared/product-store.service';
import { SearchProducts } from '../shared/search-products';

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
	displayedColumns = ['picture', 'title', 'category', 'subcategory', 'price', 'description'];
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

	/**
	 * Search Products
	 */
	searchProducts(searchInput: SearchProducts) {
		this.products = this.productService.searchProducts(searchInput);
		this.dataSource = new MatTableDataSource<Product>(this.products);
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	resetProducts() {
		this.dataSource.filter = '';
	}
}
