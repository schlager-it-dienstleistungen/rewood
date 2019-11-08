import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/product';
import { ProductStoreService } from '../shared/product-store.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'sw-product-details',
	templateUrl: './product-details.component.html',
	styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
	product: Product;

	constructor(
		private productService: ProductStoreService,
		private route: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit() {
		const params = this.route.snapshot.paramMap;
		const id = params.get('id');
		this.product = this.productService.getProduct(id);
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
