import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/reducers';
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
/*			this.userStoreService.getUser(id).subscribe(res => {
				if (res) {
					this.user = res;
					this.rolesSubject.next(this.user.roles);
					this.categoryNotificationSubject.next(this.user.categoryNotifications);
					this.setFormValues(this.user);
				}
			});*/
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
//		this.userForm.patchValue(user);

		/*this.userForm.setControl(
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

	submitForm(submitAndNewUser: boolean) {
/*		this.hasFormErrors = false;
		const controls = this.userForm.controls;
		/** check form
		if (this.userForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			this.formErrorMessage = 'Fehlerhafte Eingabe - Bitte füllen Sie alle Daten korrekt aus!';
			return;
		}

		this.submitted = true;

		// Store User in Firestore
		this.prepareAndSubmitUser();*/
	}

	/**
	 * Store User
	 */
	prepareAndSubmitUser() {
/*		const newUser: User = this.prepareUser();

		this.userStoreService.storeUser(newUser, this.isNewUser).then (() => {

			if (this.isNewUser) {
				this.router.navigate(['../../users'],
					{ relativeTo: this.route, queryParams: {newUser: true} }
				);
			} else {
				this.router.navigate(['../../../users'],
					{ relativeTo: this.route, queryParams: {editUser: true} }
				);
			}

		}).catch(error => {
			this.hasFormErrors = true;
			this.formErrorMessage = error.message;
			return;
			// this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN') + '<br/><br/>' + error.message, 'danger');
		}).finally(() => {
			this.cdr.markForCheck();
		});*/
	}

	/**
	 * Returns prepared data for save
	 */
/*	prepareUser(): User {
		const formValue = this.userForm.value;
		const newUser: User = {...formValue};
		newUser.active = true;
		newUser.emailVerified = false;

		// Firebase-Authentication UID setzen
		newUser.authUid = this.user.authUid;

		// MetaData
		newUser.tstCreate = this.user.tstCreate;
		newUser.userCreate = this.user.userCreate;

		// Rollen setzen
		newUser.roles = this.rolesSubject.value;

		// Category Notifications
		newUser.categoryNotifications = this.categoryNotificationSubject.value;

		return newUser;
	}*/

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
