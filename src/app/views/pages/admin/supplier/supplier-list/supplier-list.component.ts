import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageType, NotificationService } from '../../../shared/notification.service';
import { Supplier } from '../../../shared/supplier';
import { SupplierStoreService } from '../../../shared/supplier-store.service';

@Component({
	selector: 'rw-supplier-list',
	templateUrl: './supplier-list.component.html',
	styleUrls: ['./supplier-list.component.scss']
})
export class SupplierListComponent implements OnInit, AfterViewInit {
	// Paginator
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	// Sort
	@ViewChild(MatSort, {static: true}) sort: MatSort;

	dataSource: MatTableDataSource<Supplier>;
	isLoading = false;

	// Table Fields
	displayedColumns = ['supplierNumber', 'name', 'location', 'phone', 'email', 'fsc', 'pefc', 'actions'];

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private supplierService: SupplierStoreService,
		private notificationService: NotificationService
	) { }

	ngOnInit() {
		this.isLoading = true;

		// If a New Supplier was created --> Show Message
		this.route.queryParams
			.subscribe(queryParams => {
				if (queryParams.newSupplier === 'true') {
					const message = `Neuer Lieferant wurde erfolgreich angelegt.`;
					this.notificationService.showActionNotification(message, MessageType.Create);
				}
			});

		// If a Existing Supplier was saved --> Show Message
		this.route.queryParams
			.subscribe(queryParams => {
				if (queryParams.editSupplier === 'true') {
					const message = `Lieferant wurde erfolgreich geändert.`;
					this.notificationService.showActionNotification(message, MessageType.Create);
				}
			});
	}

	/**
  * Set the paginator and sort after the view init since this component will
  * be able to query its view for the initialized paginator and sort.
  */
	ngAfterViewInit() {
		this.supplierService.getAllActiveSuppliers().subscribe(data => {
			this.isLoading = false;
			this.dataSource = new MatTableDataSource<Supplier>(data);
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
	editSupplier(id) {
		this.router.navigate(['../suppliers/edit', id], { relativeTo: this.route });
	}

	/**
	 * Delete Supplier - here: set inactive
	 *
	 * @param item: Supplier
	 */
	deleteSupplier(toDelete: Supplier) {
		const title = 'Delete Supplier';
		const description = 'Are you sure to permanently delete this supplier?';
		const waitDesciption = 'Supplier is deleting...';
		const deleteMessage = `Supplier has been deleted`;

		const dialogRef = this.notificationService.deleteElement(title, description, waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			this.supplierService.inactivateSupplier(toDelete).then(() => {
				this.notificationService.showActionNotification(deleteMessage, MessageType.Delete);
			}).catch(error => {
				this.notificationService.showActionNotification(error.message, MessageType.Delete);
			});
		});
	}

}
