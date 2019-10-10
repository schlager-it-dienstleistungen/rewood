import { Component, OnInit } from '@angular/core';
import { ProductStoreService } from '../shared/product-store.service';
import { Category } from '../shared/category';

@Component({
	selector: 'sw-card-layout',
	templateUrl: './card-layout.component.html',
	styleUrls: ['./card-layout.component.scss']
})
export class CardLayoutComponent implements OnInit {
	categories: Category[];

	constructor(
		private productService: ProductStoreService
	) { }

	ngOnInit() {
		this.categories = this.productService.getCategories();
	}
}
