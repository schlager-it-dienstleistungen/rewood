import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../shared/product';
import { ProductStoreService } from '../../../shared/product-store.service';
import { MessageType, NotificationService, PanelClass } from '../../../shared/notification.service';
import { UserStoreService } from '../../../shared/user-store.service';
import { AppState } from 'src/app/core/reducers';
import { select, Store } from '@ngrx/store';
import { currentUser } from 'src/app/core/auth';
import { RolesTable } from 'src/app/core/auth/_server/roles.table';

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
		private notificationService: NotificationService,
		private userStoreService: UserStoreService,
		private store: Store<AppState>,
	) { }

	ngOnInit() {
		this.isLoading = true;


		this.route.queryParams
			.subscribe(queryParams => {

				// If a New Producct was created --> Show Message
				if (queryParams.newSupplier === 'true') {
					const message = `Neues Produkt wurde erfolgreich angelegt.`;
					this.notificationService.showActionNotification(message);
				}

				// If a Existing Supplier was saved --> Show Message
				if (queryParams.editSupplier === 'true') {
					const message = `Produkt wurde erfolgreich geändert.`;
					this.notificationService.showActionNotification(message);
				}

				// If an Error occured during NewProduct --> Show Message
				if (queryParams.errorWhenNew === 'true') {
					const message = queryParams.message;
					this.notificationService.showActionNotification(message, MessageType.Create, PanelClass.ERROR);
				}
			});
	}

	/**
  * Set the paginator and sort after the view init since this component will
  * be able to query its view for the initialized paginator and sort.
  */
	ngAfterViewInit() {
		this.productService.getAllActiveProducts().subscribe(data => {
			this.initDataSource(data);
		});

		// Get Current LoggedIn User and Role
		this.store.pipe(select(currentUser)).subscribe(currentUser => {
			if(!currentUser || !currentUser.id) {
				return;
			}
			this.userStoreService.getUser(currentUser.id).subscribe(user => {
				if(!user || !user.roles) {
					return;
				}

				// User is in role SUPPLIER and not ADMIN
				if(!RolesTable.isRoleADMIN(user.roles) && RolesTable.isRoleSUPPLIER(user.roles)){
					// User has no SupplierNumber
					if(!user.supplierNumber){
						this.notificationService.showActionNotification('Benutzer hat keine Lieferantennummer eingetragen', MessageType.Create, PanelClass.ERROR);
						this.initDataSource([]);
					// Filter acitve products by SupplierNumber
					} else {
						const filteredBySupplier = this.dataSource.data.filter(product => {
							return product.supplierNumber === user.supplierNumber;
						});
						this.initDataSource(filteredBySupplier);
					}
				}
			});
		});
	}

	private initDataSource(data: Product[]) {
		this.isLoading = false;
		this.dataSource = new MatTableDataSource<Product>(data);
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
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

		const dialogRef = this.notificationService.deleteElement(title, description, waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			this.productService.inactivateSupplier(toDelete).then(() => {
				this.notificationService.showActionNotification(deleteMessage, MessageType.Delete);
			}).catch(error => {
				this.notificationService.showActionNotification(error.message, MessageType.Delete);
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
