import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../shared/product';
import { ProductStoreService } from '../../shared/product-store.service';

@Component({
	selector: 'rw-latest-products',
	templateUrl: './latest-products.component.html',
	styleUrls: ['./latest-products.component.scss']
})
export class LatestProductsComponent implements OnInit, AfterViewInit {
	dataSource: MatTableDataSource<Product>;
	isLoading = false;

	// Table Fields
	displayedColumns = ['category', 'title', 'quantity', 'price', 'description', 'status'];

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private productService: ProductStoreService,
		private cdr: ChangeDetectorRef
	) { }

	ngOnInit() {
		this.isLoading = true;
	}

	/**
  * Set the paginator and sort after the view init since this component will
  * be able to query its view for the initialized paginator and sort.
  */
	ngAfterViewInit() {
		this.productService.getLatestProducts().subscribe(data => {
			this.dataSource = new MatTableDataSource<Product>(data);
			this.isLoading = false;
			this.cdr.markForCheck();
		});
	}

	selectedProduct(id) {
		this.router.navigate(['../products/', 'product', id], { relativeTo: this.route});
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
