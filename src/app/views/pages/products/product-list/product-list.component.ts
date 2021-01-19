import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutUtilsService } from 'src/app/core/_base/crud';
import { CategoryFactoryService } from '../../shared/category-factory.service';
import { Product } from '../../shared/product';
import { ProductStoreService } from '../../shared/product-store.service';

@Component({
	selector: 'rw-product-list',
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

	// Categories
	categories = CategoryFactoryService.getCategories();

	// Table Fields
	displayedColumns = ['picture', 'category', 'title', 'quantity', 'price', 'description', 'status'];

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private productService: ProductStoreService,
		private layoutUtilsService: LayoutUtilsService
	) { }

	ngOnInit() {
		this.isLoading = true;
	}

	/**
  * Set the paginator and sort after the view init since this component will
  * be able to query its view for the initialized paginator and sort.
  */
	ngAfterViewInit() {
		this.productService.getAllActiveProducts().subscribe(data => {
			this.isLoading = false;
			this.dataSource = new MatTableDataSource<Product>(data);
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;
		});
	}

	doFilterCategory($event) {
		this.dataSource.filterPredicate = (
			data: Product, filter: string) => (('' + data.category).indexOf(filter) !== -1
		);
		this.dataSource.filter = '' + $event;
	}

	doFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
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
		console.log('product.pictures[0]: ' + product.pictures[0]);
		return product.pictures[0];
	}
}
