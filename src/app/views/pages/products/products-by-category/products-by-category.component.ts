import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Product } from '../../shared/product';
import { ProductStoreService } from '../../shared/product-store.service';

@Component({
  selector: 'rw-products-by-category',
  templateUrl: './products-by-category.component.html',
  styleUrls: ['./products-by-category.component.scss']
})
export class ProductsByCategoryComponent implements OnInit, AfterViewInit {
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
		private productService: ProductStoreService,
		private storage: AngularFireStorage
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
		this.productService.getActiveProductsToCategory(this.category).subscribe(data => {
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

	firstPicture(product: Product): Observable<string> {
		if(!product.pictures || product.pictures.length<=0) {
			console.log('return not availabe');
			return of('https://firebasestorage.googleapis.com/v0/b/rewood-a7ef8.appspot.com/o/products%2F1611068942217_IMG_9475.JPG_800x800?alt=media&token=d5f1b4ad-916d-44a5-8a1b-cd42d765f1d0');
			return of('https://firebasestorage.googleapis.com/v0/b/rewood-a7ef8.appspot.com/o/image_not_available_small.png?alt=media&token=24790fdf-1e4d-4fb7-a284-3ea75a7dbb62');
		}
		const storageRef = this.storage.ref(product.pictures[0].path);
		storageRef.getDownloadURL().subscribe(url => {console.log('url: ' + url); return url});
	}
}
