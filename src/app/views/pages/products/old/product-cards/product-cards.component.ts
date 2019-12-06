import { Component, OnInit } from '@angular/core';
import { Category } from '../../shared/category';
import { ProductStoreService } from '../../shared/product-store.service';
import { Product } from '../../shared/product';
import { FormControl } from '@angular/forms';
import { SearchProducts } from '../../shared/search-products';

@Component({
	selector: 'sw-product-cards',
	templateUrl: './product-cards.component.html',
	styleUrls: ['./product-cards.component.scss']
})
export class ProductCardsComponent implements OnInit {
	categories: Category[];
	products: Product[];

	// Filter Category
	filterCategoryControl = new FormControl('');

	constructor(
		private productService: ProductStoreService
	) { }

	ngOnInit() {
		this.categories = this.productService.getCategories();
		this.products = this.productService.getAllProducts();

		this.filterCategoryControl.valueChanges.subscribe(filterCategory => this.filterCategory(filterCategory));
	}

	filterCategory(filterCategory: any) {
		const searchInput: SearchProducts = {
			category: filterCategory
		};
		this.products = this.productService.searchProducts(searchInput);
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
