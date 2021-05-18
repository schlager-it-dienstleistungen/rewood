import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { currentUser } from 'src/app/core/auth';
import { AppState } from 'src/app/core/reducers';
import { MessageType, NotificationService } from '../../shared/notification.service';
import { Product } from '../../shared/product';
import { ProductStoreService } from '../../shared/product-store.service';
import { UserStoreService } from '../../shared/user-store.service';
import { RolesTable } from 'src/app/core/auth/_server/roles.table';
import { select, Store } from '@ngrx/store';

@Component({
	selector: 'sw-product-detail',
	templateUrl: './product-detail.component.html',
	styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
	product$: Observable<Product>;
	isReservationPossible: boolean;

	constructor(
		private productService: ProductStoreService,
		private route: ActivatedRoute,
		private notificationService: NotificationService,
		private router: Router,
		private userStoreService: UserStoreService,
		private store: Store<AppState>,
		private cdr: ChangeDetectorRef
	) { }

	ngOnInit() {
		const params = this.route.snapshot.paramMap;
		const id = params.get('id');
		this.product$ = this.productService.getProduct(id);

		// If another Product should be created after New --> go to CreatenWizard
		this.route.queryParams
			.subscribe(queryParams => {
				if (queryParams.submitAndNewProduct === 'true') {
					this.router.navigate(['../../../admin/createProduct'], { relativeTo: this.route });
				}
			});

		// If a New Product was created --> Show Message
		this.route.queryParams
			.subscribe(queryParams => {
				if (queryParams.newProduct === 'true') {
					const message = `Neues Produkt wurde erfolgreich angelegt.`;
					this.notificationService.showActionNotification(message, MessageType.Create);
				}
			});

		this.isReservationPossible = false;
		// Get Current LoggedIn User and Role
		this.store.pipe(select(currentUser)).subscribe(currentUser => {
			if(currentUser && currentUser.id) {
				this.userStoreService.getUser(currentUser.id).subscribe(user => {
					if(!user || !user.roles) {
						this.isReservationPossible = false;
					}

					// User is not in Role Customer
					if(RolesTable.isRoleCUSTOMER(user.roles)){

						this.product$.subscribe(productToCheck => {
							if(this.productService.isAvailable(productToCheck.status)){
								this.isReservationPossible = true;
								this.cdr.markForCheck();
							}
						});
					}else{
						this.isReservationPossible = false;
					}
				});
			}
		});
	}

	/**
	 * Change status of this product to reserved
	 *
	 * @param toReserve product to reserve
	 */
	onReserveClick(toReserve: Product) {
		this.productService.reserveProduct(toReserve);
		this.isReservationPossible = false;
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
