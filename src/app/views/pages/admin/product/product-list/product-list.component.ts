import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutUtilsService, MessageType } from 'src/app/core/_base/crud';
import { Product } from '../../../shared/product';
import { ProductStoreService } from '../../../shared/product-store.service';
import { ActionNotificationComponent} from '../../../../partials/content/crud';

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

	// Category
	category: string;

	// Table Fields
	displayedColumns = ['category', 'title', 'quantity', 'price', 'description', 'status', 'actions'];

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private productService: ProductStoreService,
		private layoutUtilsService: LayoutUtilsService,
		private snackBar: MatSnackBar
	) { }

	ngOnInit() {
		this.isLoading = true;


		this.route.queryParams
			.subscribe(queryParams => {

				// If a New Producct was created --> Show Message
				if (queryParams.newSupplier === 'true') {
					const message = `Neues Produkt wurde erfolgreich angelegt.`;
					this.layoutUtilsService.showActionNotification(message, MessageType.Create, 10000, true, false);
				}

				// If a Existing Supplier was saved --> Show Message
				if (queryParams.editSupplier === 'true') {
					const message = `Produkt wurde erfolgreich geändert.`;
					this.layoutUtilsService.showActionNotification(message, MessageType.Create, 10000, true, false);
				}

				// If an Error occured during NewProduct --> Show Message
				if (queryParams.errorWhenNew === 'true') {
					const message = queryParams.message;
					const config = new MatSnackBarConfig();
					config.verticalPosition = 'bottom';
					config.panelClass = ['error_class'];
					config.duration = 10000;
					//this.snackBar.open(message, 'Undo', config);

					const _data = {
						message: message,
						snackBar: this.snackBar,
						showCloseButton: true,
						showUndoButton: false,
						undoButtonDuration: 10000,
						verticalPosition: 'bottom',
						//type: Create,
						action: 'Undo'
					};
					this.snackBar.openFromComponent(ActionNotificationComponent, {
						duration: 10000,
						data: _data,
						verticalPosition: 'bottom',
						panelClass: ['error_class']
					});
				}
			});
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

	doFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
	}

	/** ACTIONS */
	/**
	 * Redirect to edit page
	 */
	editProduct(id) {
		this.router.navigate(['../adminproducts/edit', id], { relativeTo: this.route });
	}

	/**
	 * Delete Product - here: set inactive
	 *
	 * @param item: Product
	 */
	deleteProduct(toDelete: Product) {
		const title = 'Delete Product';
		const description = 'Are you sure to permanently delete this product?';
		const waitDesciption = 'Product is deleting...';
		const deleteMessage = `Product has been deleted`;

		const dialogRef = this.layoutUtilsService.deleteElement(title, description, waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			this.productService.inactivateSupplier(toDelete).then(() => {
				this.layoutUtilsService.showActionNotification(deleteMessage, MessageType.Delete, 10000, true, false);
			}).catch(error => {
				this.layoutUtilsService.showActionNotification(error.message, MessageType.Delete, 10000, true, false);
			});
		});
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
