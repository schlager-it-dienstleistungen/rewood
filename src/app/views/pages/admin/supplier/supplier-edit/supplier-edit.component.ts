import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/reducers';
import { LocationService } from '../../../shared/location.service';
import { Supplier } from '../../../shared/supplier';
import { SupplierFactoryService } from '../../../shared/supplier-factory.service';
import { SupplierStoreService } from '../../../shared/supplier-store.service';

@Component({
	selector: 'rw-supplier-edit',
	templateUrl: './supplier-edit.component.html',
	styleUrls: ['./supplier-edit.component.scss']
})
export class SupplierEditComponent implements OnInit, OnChanges, AfterViewInit {
	supplierForm: FormGroup;
	supplier: Supplier;

	@ViewChild('wizard', {static: true}) el: ElementRef;
	submitted = false;
	hasFormErrors = false;
	formErrorMessage = '';
	isNewSupplier: boolean;

	// Countries
	countries = LocationService.getCountries();

	constructor(
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private cdr: ChangeDetectorRef,
		private supplierStoreService: SupplierStoreService,
		private supplierFactory: SupplierFactoryService,
		private store: Store<AppState>) {
	}

	ngOnInit(): void {
		const params = this.route.snapshot.paramMap;
		const id = params.get('id');
		if (id && id.length > 0) {
			this.isNewSupplier = false;
		} else {
			this.isNewSupplier = true;
		}

		this.initForm();

		if (this.isNewSupplier) {
			this.supplier = SupplierFactoryService.empty();
			this.supplier.id = this.supplierStoreService.createSupplierId();
			this.setFormValues(this.supplier);
		} else {
			this.supplierStoreService.getSupplier(id).subscribe(res => {
				if (res) {
					this.supplier = res;
					this.setFormValues(this.supplier);
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
		this.setFormValues(this.supplier);
	}

	private initForm() {
		if (this.supplierForm) { return; }
		this.supplierForm = this.fb.group({
			id: [''],
			name: ['', [
				Validators.required,
				Validators.minLength(3)]],
			homepage: [''],
			phone: [''],
			email: [''],
			address1: ['', Validators.required],
			address2: [''],
			postcode: ['', [Validators.required, Validators.pattern(/^\d{1,5}?$/)]],
			city: ['', Validators.required],
			country: ['AT', Validators.required]
		});
	}

	private setFormValues(supplier: Supplier) {
		this.supplierForm.patchValue(supplier);
	}

	onSubmit() {
		this.hasFormErrors = false;
		const controls = this.supplierForm.controls;
		/** check form */
		if (this.supplierForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			this.formErrorMessage = 'Fehlerhafte Eingabe - Bitte füllen Sie alle Daten korrekt aus!';
			return;
		}

		this.submitted = true;

		// Store Supplier in Firestore
		this.prepareAndSubmitSupplier();
	}

	/**
	 * Store Supplier
	 */
	prepareAndSubmitSupplier() {
		const newSupplier: Supplier = this.prepareSupplier();

		this.supplierStoreService.storeSupplier(newSupplier, this.isNewSupplier).then (() => {

			if (this.isNewSupplier) {
				this.router.navigate(['../../suppliers'],
					{ relativeTo: this.route, queryParams: {newSupplier: true} }
				);
			} else {
				this.router.navigate(['../../../suppliers'],
					{ relativeTo: this.route, queryParams: {editSupplier: true} }
				);
			}

		}).catch(error => {
			this.hasFormErrors = true;
			this.formErrorMessage = error.message;
			return;
			// this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN') + '<br/><br/>' + error.message, 'danger');
		}).finally(() => {
			this.cdr.markForCheck();
		});
	}

	/**
	 * Returns prepared data for save
	 */
	prepareSupplier(): Supplier {
		const formValue = this.supplierForm.value;
		const newSupplier: Supplier = {...formValue};
		newSupplier.active = true;

		// MetaData
		newSupplier.tstCreate = this.supplier.tstCreate;
		newSupplier.userCreate = this.supplier.userCreate;

		return newSupplier;
	}

	/**
	 * Close Alert
	 *
	 * @param $event Event
	 */
	onAlertClose($event) {
		this.hasFormErrors = false;
	}

	// Getter
	get homepage() { return this.supplierForm.get('homepage'); }
	get email() { return this.supplierForm.get('email'); }
	get name() { return this.supplierForm.get('name'); }
	get phone() { return this.supplierForm.get('phone'); }
	get address1() { return this.supplierForm.get('address1'); }
	get address2() { return this.supplierForm.get('address2'); }
	get postcode() { return this.supplierForm.get('postcode'); }
	get city() { return this.supplierForm.get('city'); }
	get country() { return this.supplierForm.get('country'); }

	/* UI */

}
