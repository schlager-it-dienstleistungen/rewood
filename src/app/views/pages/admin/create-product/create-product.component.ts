import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Output, Input, EventEmitter, OnChanges } from '@angular/core';
import { ProductFactoryService } from '../../shared/product-factory.service';
import { Category } from '../../shared/category';
import { CategoryFactoryService } from '../../shared/category-factory.service';
import { Product } from '../../shared/product';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ProductStoreService } from '../../shared/product-store.service';
import { LocationService } from '../../shared/location.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Picture } from '../../shared/picture';

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
		/*this.productStoreService.createProduct(product).subscribe(() => {
			this.router.navigate(['../..', 'books'],
				{relativeTo: this.route });
		});*/
		debugger;
		this.productStoreService.createProduct(product);
		this.router.navigate(['../..', 'books'], {relativeTo: this.route });
	}
}
