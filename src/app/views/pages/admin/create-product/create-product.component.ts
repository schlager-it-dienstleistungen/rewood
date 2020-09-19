import { Component, OnInit, ElementRef, ViewChild, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CategoryFactoryService } from '../../shared/category-factory.service';
import { Product } from '../../shared/product';
import { FormGroup } from '@angular/forms';
import { ProductStoreService } from '../../shared/product-store.service';
import { LocationService } from '../../shared/location.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'rw-create-product',
	templateUrl: './create-product.component.html',
	styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

	@Output() submitProduct = new EventEmitter<{newProduct: Product, submitAndNewProduct: boolean}>();
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

	createProduct(event: any) {
		const product = event.newProduct;
		const submitAndNewProduct = event.submitAndNewProduct;

		this.productStoreService.createProduct(product).then(
			() => {
				this.router.navigate(['../../products', 'product', product.id],
					{ relativeTo: this.route, queryParams: {newProduct: 'true', submitAndNewProduct}});
			}
		);
	}
}
