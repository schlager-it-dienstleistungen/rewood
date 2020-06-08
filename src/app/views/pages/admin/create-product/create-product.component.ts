import { Component, OnInit, ElementRef, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { CategoryFactoryService } from '../../shared/category-factory.service';
import { Product } from '../../shared/product';
import { FormGroup } from '@angular/forms';
import { ProductStoreService } from '../../shared/product-store.service';
import { LocationService } from '../../shared/location.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'rw-create-product',
	templateUrl: './create-product.component.html',
	styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

	productForm: FormGroup;
	@Output() submitProduct = new EventEmitter<Product>();
	@Input() product: Product;
	@Input() editing = false;

	// Categories
	categories = CategoryFactoryService.getCategories();
	// Countries
	countries = LocationService.getCountries();

	@ViewChild('wizard', {static: true}) el: ElementRef;
	submitted = false;

	constructor(
		private productStoreService: ProductStoreService,
		private route: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit() {
	}

	createProduct(product: Product) {
		this.productStoreService.createProduct(product).then(
			() => {
				this.router.navigate(['../../products', 'product', product.id], { relativeTo: this.route, queryParams: {newProduct: 'true'}});
			}
		);
	}
}
