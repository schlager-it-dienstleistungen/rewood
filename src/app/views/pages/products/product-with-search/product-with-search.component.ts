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
export class ProductWithSearchComponent implements OnInit {
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
	 * Search Products
	 */
	searchProducts(searchInput: SearchProducts) {
		this.products = this.productService.searchProducts(searchInput);
		this.dataSource = new MatTableDataSource<Product>(this.products);
	}

	resetProducts() {
		this.dataSource.filter = '';
	}
}
