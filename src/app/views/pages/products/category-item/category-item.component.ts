import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../shared/category';
import { ProductStoreService } from '../../shared/product-store.service';

@Component({
	selector: 'rw-category-item',
	templateUrl: './category-item.component.html',
	styleUrls: ['./category-item.component.scss']
})
export class CategoryItemComponent implements OnInit {
	@Input() title: string;
	category: Category;

	constructor(
		private productService: ProductStoreService
	) { }

	ngOnInit() {
		this.category = this.productService.getCategory(this.title);
	}

}
