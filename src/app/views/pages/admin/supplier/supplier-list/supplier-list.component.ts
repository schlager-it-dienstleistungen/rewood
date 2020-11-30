import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutUtilsService, MessageType } from 'src/app/core/_base/crud';
import { Supplier } from '../../../shared/supplier';
import { SupplierFactoryService } from '../../../shared/supplier-factory.service';
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
	displayedColumns = ['name', 'country', 'actions'];

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private supplierService: SupplierStoreService,
		private supplierFactory: SupplierFactoryService,
		private layoutUtilsService: LayoutUtilsService
	) { }

	ngOnInit() {
		this.isLoading = true;

		// If a New Supplier was created --> Show Message
		this.route.queryParams
			.subscribe(queryParams => {
				if (queryParams.newSupplier === 'true') {
					const message = `Neuer Lieferant wurde erfolgreich angelegt.`;
					this.layoutUtilsService.showActionNotification(message, MessageType.Create, 10000, true, false);
				}
			});

		// If a Existing Supplier was saved --> Show Message
		this.route.queryParams
			.subscribe(queryParams => {
				if (queryParams.editSupplier === 'true') {
					const message = `Lieferant wurde erfolgreich geändert.`;
					this.layoutUtilsService.showActionNotification(message, MessageType.Create, 10000, true, false);
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

		const dialogRef = this.layoutUtilsService.deleteElement(title, description, waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			this.supplierService.inactivateSupplier(toDelete).then(() => {
				this.layoutUtilsService.showActionNotification(deleteMessage, MessageType.Delete, 10000, true, false);
			}).catch(error => {
				this.layoutUtilsService.showActionNotification(error.message, MessageType.Delete, 10000, true, false);
			});
		});
	}

}
