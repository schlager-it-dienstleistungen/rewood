import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/category';
import { ProductStoreService } from '../shared/product-store.service';

@Component({
	selector: 'sw-productcategories',
	templateUrl: './productcategories.component.html',
	styleUrls: ['./productcategories.component.scss']
})
export class ProductcategoriesComponent implements OnInit {
	categories: Category[];

	constructor(
		private productService: ProductStoreService
	) { }

	ngOnInit() {
		this.categories = this.productService.getCategories();
	}

}
