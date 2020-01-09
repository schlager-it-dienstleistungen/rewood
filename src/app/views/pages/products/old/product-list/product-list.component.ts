import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Product } from '../../shared/product';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ProductStoreService } from '../../shared/product-store.service';

@Component({
	selector: 'sw-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
	products: Product[];
	dataSource: MatTableDataSource<Product>;

	constructor(
		private productService: ProductStoreService
	) { }

	ngOnInit() {
		this.products = this.productService.getStaticProducts();
		this.dataSource = new MatTableDataSource<Product>(this.products);
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


}
