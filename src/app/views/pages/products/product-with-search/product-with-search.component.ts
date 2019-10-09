import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Product } from '../shared/product';
import { ProductStoreService } from '../shared/product-store.service';
import { SearchProducts } from '../shared/search-products';

@Component({
	selector: 'sw-product-with-search',
	templateUrl: './product-with-search.component.html',
	styleUrls: ['./product-with-search.component.scss']
})
export class ProductWithSearchComponent implements OnInit, AfterViewInit {
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
