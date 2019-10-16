import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/category';
import { ProductStoreService } from '../shared/product-store.service';

@Component({
	selector: 'sw-product-cards',
	templateUrl: './product-cards.component.html',
	styleUrls: ['./product-cards.component.scss']
})
export class ProductCardsComponent implements OnInit {
	categories: Category[];

	constructor(
		private productService: ProductStoreService
	) { }

	ngOnInit() {
		this.categories = this.productService.getCategories();
	}
}
