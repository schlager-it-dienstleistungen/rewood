import { AfterViewInit, ChangeDetectorRef, Component, ElementRef,  OnChanges, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { Role, selectAllRoles } from 'src/app/core/auth';
import { RolesTable } from 'src/app/core/auth/_server/roles.table';
import { AppState } from 'src/app/core/reducers';
import { PasswordFactoryService } from '../../../shared/password-factory.service';
import { Supplier } from '../../../shared/supplier';
import { SupplierStoreService } from '../../../shared/supplier-store.service';
import { User } from '../../../shared/user';
import { UserFactoryService } from '../../../shared/user-factory.service';
import { UserStoreService } from '../../../shared/user-store.service';
import { UserEmailExistsValidatorService } from '../../shared/user-email-exists-validator.service';

@Component({
	selector: 'rw-user-edit',
	templateUrl: './user-edit.component.html',
	styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit, OnChanges, AfterViewInit {
	userForm: FormGroup;
	user: User;

	rolesSubject = new BehaviorSubject<number[]>([]);
	roles = this.rolesSubject.asObservable();
	allRoles: Role[];
	categoryNotificationSubject = new BehaviorSubject<string[]>([]);

	@ViewChild('wizard', {static: true}) el: ElementRef;
	submitted = false;
	hasFormErrors = false;
	formErrorMessage = '';
	isNewUser: boolean;

	allSuppliers: Supplier[];

	constructor(
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private cdr: ChangeDetectorRef,
		private userStoreService: UserStoreService,
		private userFactory: UserFactoryService,
		private userEmailExistsValidator: UserEmailExistsValidatorService,
		private supplierService: SupplierStoreService,
		private store: Store<AppState>) {
	}

	ngOnInit(): void {
		const params = this.route.snapshot.paramMap;
		const id = params.get('id');
		if (id && id.length > 0) {
			this.isNewUser = false;
		} else {
			this.isNewUser = true;
		}

		// Load All Suppliers
		this.supplierService.getAllActiveSuppliers().subscribe(data => {
			this.allSuppliers = data;
		});

		this.store.pipe(select(selectAllRoles)).subscribe(allRoles => { this.allRoles = allRoles as Role[]; });
		this.initForm();

		if (this.isNewUser) {
			this.user = UserFactoryService.empty();
			this.user.id = this.userStoreService.createUserId();
			this.rolesSubject.next(this.user.roles);
			this.categoryNotificationSubject.next(this.user.categoryNotifications);
			this.user.password = PasswordFactoryService.generatePassword();
			this.setFormValues(this.user);
		} else {
			this.userStoreService.getUser(id).subscribe(res => {
				if (res) {
					this.user = res;
					this.rolesSubject.next(this.user.roles);
					this.categoryNotificationSubject.next(this.user.categoryNotifications);
					this.setFormValues(this.user);
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
		this.setFormValues(this.user);
	}

	private initForm() {
		if (this.userForm) { return; }
		this.userForm = this.fb.group({
			id: [''],
			username: ['', [
				Validators.required,
				Validators.minLength(6)]],
			firstname: ['', [
				Validators.required,
				Validators.minLength(3)]],
			lastname: ['', [
				Validators.required,
				Validators.minLength(3)]],
			email: [
				{value: '', disabled: !this.isNewUser },
				[
					Validators.required,
					Validators.email
				],
				this.isNewUser ? [this.userEmailExistsValidator] : null
			],
			company: ['', [ Validators.required]],
			phone: [''],
			password: [''],
			supplierNumber: [0]
		});
	}

	private setFormValues(user: User) {
		this.userForm.patchValue(user);

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
		this.hasFormErrors = false;
		const controls = this.userForm.controls;
		/** check form */
		if (this.userForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			this.formErrorMessage = 'Fehlerhafte Eingabe - Bitte füllen Sie alle Daten korrekt aus!';
			return;
		}

		// Check if a Role is selected
		if(!this.isRoleSelected()) {
			this.hasFormErrors = true;
			this.formErrorMessage = 'Fehlerhafte Eingabe - Es muss eine Rolle ausgewählt werden!';
			return;
		}

		// Check if valid Supplier when SUPPLIER-Role
		if(!this.isSupplierValidWhenRoleSupplier()) {
			this.hasFormErrors = true;
			this.formErrorMessage = 'Fehlerhafte Eingabe - Es muss ein Lieferant gewählt werden!';
			return;
		}

		this.submitted = true;

		// Store User in Firestore
		this.prepareAndSubmitUser();
	}

	/**
	 * Store User
	 */
	prepareAndSubmitUser() {
		const newUser: User = this.prepareUser();

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
		});
	}

	/**
	 * Returns prepared data for save
	 */
	prepareUser(): User {
		const formValue = this.userForm.value;
		const newUser: User = {...formValue};

		/**
		 * EMail is disabled when edit a user
		 */
		if(!this.isNewUser) {
			newUser.email = this.user.email;
		}

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
	}

	/**
	 * Checks if a Role is selected
	 */
	isRoleSelected(): boolean {
		if(this.rolesSubject.value.length <= 0) {
			return false;
		}
		return true;
	}

	/**
	 * Checks if a Supplier is selected, when role is SUPPLIER
	 */
	isSupplierValidWhenRoleSupplier(): boolean {
		if(this.rolesSubject.value.indexOf(RolesTable.RolesEnum.supplier)>=0 && this.user.supplierNumber==0) {
			return false;
		}
		return true;
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
	get username() { if (this.userForm) { return this.userForm.get('username'); } }
	get firstname() { return this.userForm.get('firstname'); }
	get lastname() { return this.userForm.get('lastname'); }
	get email() { return this.userForm.get('email'); }
	get company() { return this.userForm.get('company'); }
	get phone() { return this.userForm.get('phone'); }
	get password() { return this.userForm.get('password'); }

	/* UI */
	/**
	 * Returns RoleTitles string sperated with ' - '
	 */
	getRoleTitles(): string {
		if (this.user) {
			return this.userFactory.getRoleTitlesAsString(this.rolesSubject.value, this.allRoles);
		}
	}

	/**
	 * Returns all CategoryNotifications for UI Display
	 */
	getCategoryNotifications(): string {
		let returnString = '';
		if (this.user) {
			this.categoryNotificationSubject.value.forEach(category => {
				returnString = returnString + (returnString.length > 0 ? ', ' : '') + category;
			});
		}
		return returnString;
	}
}
