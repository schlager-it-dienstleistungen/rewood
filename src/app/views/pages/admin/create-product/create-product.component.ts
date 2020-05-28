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
export class CreateProductComponent implements OnInit, OnChanges, AfterViewInit {

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
			country: 'AT',
			pictures: this.buildPicturesArray([
				{ title: '', url: ''}
			])
		});
	}

	private buildPicturesArray(values: Picture[]): FormArray {
		return this.fb.array(values.map(t => this.fb.group(t)));
	}

	get pictures(): FormArray {
		return this.productForm.get('pictures') as FormArray;
	}

	addPictureControl() {
		this.pictures.push(this.fb.group({ url: '', title: '' }));
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

		// this.submitProduct.emit(newProduct);
		this.productStoreService.createProduct(newProduct);
		this.productForm.reset();
	}
}
