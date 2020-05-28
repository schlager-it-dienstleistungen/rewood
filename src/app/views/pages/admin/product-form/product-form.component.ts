import { Component, OnInit, OnChanges, Output, EventEmitter, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from '../../shared/product';
import { CategoryFactoryService } from '../../shared/category-factory.service';
import { LocationService } from '../../shared/location.service';
import { ProductStoreService } from '../../shared/product-store.service';

@Component({
	selector: 'rw-product-form',
	templateUrl: './product-form.component.html',
	styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, OnChanges, AfterViewInit {
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
		private fb: FormBuilder,
		private productStoreService: ProductStoreService
	) { }

	ngOnInit() {
		this.initForm();
	}

	ngAfterViewInit(): void {
		// Initialize form wizard
		const wizard = new KTWizard(this.el.nativeElement, {
			startStep: 1
		});

		// Validation before going to next page
		wizard.on('beforeNext', wizardObj => {
			// https://angular.io/guide/forms
			// https://angular.io/guide/form-validation

			// validate the form and use below function to stop the wizard's step
			// wizardObj.stop();

			const validationOK = true;
			if (!validationOK) {
				wizardObj.stop();
			}
		});

		// Change event
		/*wizard.on('change', function (wizard) {
			setTimeout(function () {
				KTUtil.scrollTop();
			}, 500);
		});*/
	}

	ngOnChanges(): void {
		this.initForm();
		this.setFormValues(this.product);
	}

	private initForm() {
		if (this.productForm) { return; }
		this.productForm = this.fb.group({
			id: this.productStoreService.createProductId(),
			title: ['', Validators.required],
			category: '',
			subcategory: '',
			price: 0.00,
			description: '',
			status: 0,
			measure: '',
			amount: 0,
			address1: '',
			address2: '',
			postcode: '',
			city: '',
			country: 'AT'
		});
	}

	private setFormValues(product: Product) {
		this.productForm.patchValue(product);

		/*this.productForm.setControl(
			'thumbnails',
			this.buildThumbnailsArray(product.thumbnails)
		);*/
	}

	onSubmit() {
		this.submitted = true;

		const formValue = this.productForm.value;

		// const thumbnails = formValue.thumbnails.filter(thumbnail => thumbnail.url);
		const newProduct: Product = {
			...formValue
		};

		this.submitProduct.emit(newProduct);
		this.productForm.reset();
	}
}
