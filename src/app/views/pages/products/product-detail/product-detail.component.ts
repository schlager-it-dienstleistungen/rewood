import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/product';
import { ProductStoreService } from '../shared/product-store.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'sw-product-detail',
	templateUrl: './product-detail.component.html',
	styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
	product: Product;

	constructor(
		private productService: ProductStoreService,
		private route: ActivatedRoute
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
