import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { Product } from '../shared/product';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ProductStoreService } from '../shared/product-store.service';
import { ActivatedRoute } from '@angular/router';
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

	@Input() products: Product[];
	@Input() dataSource: MatTableDataSource<Product>;

	// Table Fields
	displayedColumns = ['picture', 'subcategory', 'title', 'measure', 'amount', 'description', 'status'];

	constructor(
		private route: ActivatedRoute,
		private productService: ProductStoreService
	) { }

	ngOnInit() {
		const params = this.route.snapshot.paramMap;
		const searchInput: SearchProducts = {
			title: params.get('title')
		};
		this.products = this.productService.searchProducts(searchInput);
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
