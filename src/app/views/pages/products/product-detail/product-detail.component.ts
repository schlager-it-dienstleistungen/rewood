import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../../shared/product';
import { ProductStoreService } from '../../shared/product-store.service';
import { MessageType, LayoutUtilsService } from 'src/app/core/_base/crud';

@Component({
	selector: 'sw-product-detail',
	templateUrl: './product-detail.component.html',
	styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
	product$: Observable<Product>;

	constructor(
		private productService: ProductStoreService,
		private route: ActivatedRoute,
		private layoutUtilsService: LayoutUtilsService,
		private router: Router
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
					this.layoutUtilsService.showActionNotification(message, MessageType.Create, 10000, true, false);
				}
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
