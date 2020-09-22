import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { Role, selectAllRoles } from 'src/app/core/auth';
import { AppState } from 'src/app/core/reducers';
import { User } from '../../../shared/user';
import { UserFactoryService } from '../../../shared/user-factory.service';
import { UserStoreService } from '../../../shared/user-store.service';

@Component({
	selector: 'rw-user-edit',
	templateUrl: './user-edit.component.html',
	styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit, OnChanges, AfterViewInit {
	userForm: FormGroup;
	@Output() submitUser = new EventEmitter<{newProduct: User, submitAndNewUser: boolean}>();
	user: User;

	rolesSubject = new BehaviorSubject<number[]>([]);
	allRoles: Role[];

	@ViewChild('wizard', {static: true}) el: ElementRef;
	submitted = false;
	hasFormErrors = false;

	constructor(
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private userStoreService: UserStoreService,
		private userFactory: UserFactoryService,
		private store: Store<AppState>) {
	}

	ngOnInit(): void {
		this.store.pipe(select(selectAllRoles)).subscribe(allRoles => { this.allRoles = allRoles as Role[]; });
		this.initForm();

		const params = this.route.snapshot.paramMap;
		const id = params.get('id');
		if (id && id.length > 0) {
			this.userStoreService.getUser(id).subscribe(res => {
				if (res) {
					this.user = res;
					this.rolesSubject.next(this.user.roles);
					this.setFormValues(this.user);
				}
			});
		} else {
			// New User
			this.user = UserFactoryService.empty();
			this.user.id = this.userStoreService.createUserId();
			this.rolesSubject.next(this.user.roles);
			this.setFormValues(this.user);
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
			email: ['', [
				Validators.required,
				Validators.minLength(6)]],
			company: ['', [ Validators.required]]
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
			return;
		}

		this.submitted = true;

		const newUser: User = this.prepareUser();

		this.userStoreService.storeUser(newUser).then(
			() => {
				this.router.navigate(['../..'],
					{ relativeTo: this.route, queryParams: {newUser: 'true', submitAndNewUser}});
			}
		);
		this.userForm.reset();
	}

	/**
	 * Returns prepared data for save
	 */
	prepareUser(): User {
		const formValue = this.userForm.value;
		const newUser: User = {...formValue};

		// Firebase-Authentication UID setzen
		newUser.authUid = this.user.authUid;

		// Rollen setzen
		newUser.roles = this.rolesSubject.value;

		return newUser;
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
	/* UI */
	/**
	 * Returns RoleTitles string sperated with ' - '
	 */
	getRoleTitles(): string {
		if (this.user) {
			return this.userFactory.getRoleTitlesAsString(this.user.roles, this.allRoles);
		}
	}
}
