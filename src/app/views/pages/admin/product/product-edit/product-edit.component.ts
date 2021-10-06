import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { currentUser } from 'src/app/core/auth';
import { RolesTable } from 'src/app/core/auth/_server/roles.table';
import { AppState } from 'src/app/core/reducers';
import { CategoryFactoryService } from '../../../shared/category-factory.service';
import { LocationService } from '../../../shared/location.service';
import { Picture } from '../../../shared/picture';
import { Product } from '../../../shared/product';
import { ProductFactoryService } from '../../../shared/product-factory.service';
import { ProductStoreService } from '../../../shared/product-store.service';
import { Supplier } from '../../../shared/supplier';
import { SupplierStoreService } from '../../../shared/supplier-store.service';
import { UserStoreService } from '../../../shared/user-store.service';

@Component({
	selector: 'rw-product-edit',
	templateUrl: './product-edit.component.html',
	styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit, OnChanges, AfterViewInit {
	productForm: FormGroup;
	product: Product;

	// Categories
	categories = CategoryFactoryService.getCategories();
	// Countries
	countries = LocationService.getCountries();
	// Suppliers for ADMIN
	allSuppliers$: Supplier[];

	@ViewChild('wizard', {static: true}) el: ElementRef;
	submitted = false;
	hasFormErrors = false;
	formErrorMessage = '';
	isNewProduct: boolean;

	constructor(
		private fb: FormBuilder,
		private productStoreService: ProductStoreService,
		private userStoreService: UserStoreService,
		private supplierService: SupplierStoreService,
		private store: Store<AppState>,
		private route: ActivatedRoute,
		private router: Router,
		private cdr: ChangeDetectorRef
	) { }

	ngOnInit() {
		const params = this.route.snapshot.paramMap;
		const id = params.get('id');
		if (id && id.length > 0) {
			this.isNewProduct = false;
		} else {
			this.isNewProduct = true;
		}

		this.initForm();

		if (this.isNewProduct) {
			this.product = ProductFactoryService.empty();

			this.store.pipe(select(currentUser)).subscribe(currentUser => {
				this.userStoreService.getUser(currentUser.id).subscribe(user => {
					// User is in role ADMIN
					if(RolesTable.isRoleADMIN(user.roles)){
						// Load All Suppliers
						this.supplierService.getAllActiveSuppliers().subscribe(data => {
							this.allSuppliers$ = data;
						});
					}else{
						// User not in role SUPPLIER
						if(!RolesTable.isRoleSUPPLIER(user.roles)){
							this.router.navigate(['../../adminproducts'],
								{ relativeTo: this.route, queryParams: {errorWhenNew: true, message: 'Benutzer besitzt nicht die Rolle SUPPLIER'} }
							);
						}

						// User has no SupplierNumber
						if(!user.supplierNumber){
							this.router.navigate(['../../adminproducts'],
								{ relativeTo: this.route, queryParams: {errorWhenNew: true, message: 'Benutzer hat keine Lieferantennummer eingetragen'} }
							);
						}

						// Store the Supplier in the product
						this.product.supplierNumber = user.supplierNumber;
					}

					// Create ID
					this.product.id = this.productStoreService.createProductId();

					// Create and set Product- and ProductReferenceNumer
					this.productStoreService.createAndSetProductAndReferenceNumber(this.product);

					this.setFormValues(this.product);
				})
			});
		} else {
			this.productStoreService.getProduct(id).subscribe(res => {
				if (res) {
					this.product = res;
					this.setFormValues(this.product);
				}
			});
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
			price: [0, Validators.required],
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
			country: ['AT', Validators.required],
			supplierNumber: ['', Validators.required],
			productNumber: [0],
			productReferenceNumber: ['']
			/*,
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
	get supplierNumber() { return this.productForm.get('supplierNumber'); }

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
		this.submitForm(false);
	}

	onSubmitAndNew() {
		this.submitForm(true);
	}

	submitForm(submitAndNewProduct: boolean) {
		this.hasFormErrors = false;
		const controls = this.productForm.controls;
		/** check form */
		if (this.productForm.invalid) {
			Object.keys(controls).forEach(controlName =>{
				console.log('control: ' + controlName);
				controls[controlName].markAsTouched()}
			);

			this.hasFormErrors = true;
			this.formErrorMessage = 'Fehlerhafte Eingabe - Bitte füllen Sie alle Daten korrekt aus!';
			return;
		}

		// Check SupplierNr
		if(!this.product.supplierNumber){
			this.hasFormErrors = true;
			this.formErrorMessage = 'Produkt hat keinen gültigen Lieferanten!';
			return;
		}

		// Check no ProductNr or ProductRefenceNumber
		if(!this.product.productNumber || !this.product.productReferenceNumber){
			this.hasFormErrors = true;
			this.formErrorMessage = 'Produkt hat keine gültige Produktnummer!';
			return;
		}

		this.submitted = true;

		this.prepareAndSubmitProduct(submitAndNewProduct);
	}

	/**
	 * Store Product
	 */
	prepareAndSubmitProduct(submitAndNewProduct: boolean) {
		const newProduct: Product = this.prepareProduct();

		this.productStoreService.storeProduct(newProduct, this.isNewProduct).then (() => {

			if (this.isNewProduct) {
				this.router.navigate(['../../adminproducts'],
					{ relativeTo: this.route, queryParams: {newSupplier: true} }
				);
			/*} else if (submitAndNewProduct) {
				this.router.navigate(['../../../adminproducts/add'],
					{ relativeTo: this.route, queryParams: {newSupplier: true, editSupplier: true} }
				);*/
			} else {
				this.router.navigate(['../../../adminproducts'],
					{ relativeTo: this.route, queryParams: {editSupplier: true} }
				);
			}

		}).catch(error => {
			this.hasFormErrors = true;
			this.formErrorMessage = error.message;
			return;
		}).finally(() => {
			this.cdr.markForCheck();
		});
	}

	/**
	 * Returns prepared data for save
	 */
	prepareProduct(): Product {
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

		/**
		 * ProductNumber isn't shown in the form, so it comes from the origin Product when editing
		 */
		newProduct.supplierNumber = this.product.supplierNumber;
		newProduct.productNumber = this.product.productNumber;
		newProduct.productReferenceNumber = this.product.productReferenceNumber;

		newProduct.active = true;
		// MetaData
		newProduct.tstCreate = this.product.tstCreate;
		newProduct.userCreate = this.product.userCreate;

		return newProduct;
	}

	pictureWithOutFile(picture: Picture): Picture {
		return {
			title: picture.title,
			path: picture.path,
			url: picture.url,
			toDelete: picture.toDelete
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

	/**
	 * Change of Supplier Selection
	 *
	 * @param supplier selected Supplier
	 */
	onSupplierChange(supplier){
		// Store the Supplier in the product
		this.product.supplierNumber = supplier;

		// Create and set Product- and ProductReferenceNumer
		this.productStoreService.createAndSetReferenceNumber(this.product);
	}
}
