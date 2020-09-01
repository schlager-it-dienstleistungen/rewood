import { Component, OnInit, OnChanges, Output, EventEmitter, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from '../../shared/product';
import { CategoryFactoryService } from '../../shared/category-factory.service';
import { LocationService } from '../../shared/location.service';
import { ProductStoreService } from '../../shared/product-store.service';
import { Picture } from '../../shared/picture';
import { ProductFactoryService } from '../../shared/product-factory.service';

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
	hasFormErrors = false;

	constructor(
		private fb: FormBuilder,
		private productStoreService: ProductStoreService
	) { }

	ngOnInit() {
		this.initForm();
		if (!this.product) {
			this.product = ProductFactoryService.empty();
		}
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
			title: ['', [
				Validators.required,
				Validators.minLength(3)]],
			category: ['', Validators.required],
			subcategory: [''],
			price: [0.00, Validators.required],
			description: ['', Validators.required],
			status: [0, Validators.required],
			length: [0, Validators.required],
			width: [0, Validators.required],
			height: [0, Validators.required],
			quantity: [0, Validators.required],
			address1: ['', Validators.required],
			address2: [''],
			postcode: ['', [Validators.required, Validators.pattern(/^\d{1,5}?$/)]],
			city: ['', Validators.required],
			country: ['AT', Validators.required]/*,
			pictures: this.buildPicturesArray([
				{ title: '', path: '', url: '' }
			])*/
		});
	}

	// Getter
	get title() { return this.productForm.get('title'); }
	get category() { return this.productForm.get('category'); }
	get subcategory() { return this.productForm.get('subcategory'); }
	get description() { return this.productForm.get('description'); }
	get status() { return this.productForm.get('status'); }
	get length() { return this.productForm.get('length'); }
	get width() { return this.productForm.get('width'); }
	get height() { return this.productForm.get('height'); }
	get quantity() { return this.productForm.get('quantity'); }
	get price() { return this.productForm.get('price'); }
	get address1() { return this.productForm.get('address1'); }
	get address2() { return this.productForm.get('address2'); }
	get postcode() { return this.productForm.get('postcode'); }
	get city() { return this.productForm.get('city'); }
	get country() { return this.productForm.get('country'); }

	/*
	private buildPicturesArray(values: Picture[]): FormArray {
		return this.fb.array(values.map(t => this.fb.group(t)));
	}

	get pictures(): FormArray {
		return this.productForm.get('pictures') as FormArray;
	}

	addPictureControl() {
		this.pictures.push(this.fb.group({ title: '', path: '', url: '' }));
	}
	*/

	private setFormValues(product: Product) {
		this.productForm.patchValue(product);

		/*this.productForm.setControl(
			'thumbnails',
			this.buildThumbnailsArray(product.thumbnails)
		);*/
	}

	onSubmit() {
		this.hasFormErrors = false;
		const controls = this.productForm.controls;
		/** check form */
		if (this.productForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			return;
		}

		this.submitted = true;

		const formValue = this.productForm.value;

		// const thumbnails = formValue.thumbnails.filter(thumbnail => thumbnail.url);
		const pictures = this.product.pictures.map(picture => {
			return this.pictureWithOutFile(picture);
		});
		const dimension = {
			length: formValue.length,
			width: formValue.width,
			height: formValue.height,
			quantity: formValue.quantity
		};
		const newProduct: Product = {
			...formValue,
			pictures,
			dimension
		};

		this.submitProduct.emit(newProduct);
		this.productForm.reset();
	}

	pictureWithOutFile(picture: Picture): Picture {
		return {
			title: picture.title,
			path: picture.path,
			url: picture.url
		};
	}


	/**
	 * Close Alert
	 *
	 * @param $event Event
	 */
	onAlertClose($event) {
		this.hasFormErrors = false;
	}
}
