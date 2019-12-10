import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/category';
import { ProductStoreService } from '../shared/product-store.service';

@Component({
	selector: 'sw-product-category',
	templateUrl: './product-category.component.html',
	styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit {
	categories: Category[];

	constructor(
		private productService: ProductStoreService
	) { }

	ngOnInit() {
		this.categories = this.productService.getCategories();
	}

}
