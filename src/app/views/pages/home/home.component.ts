import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { Observable } from 'rxjs';
import { currentUser, isLoggedIn, Logout, User } from 'src/app/core/auth';
import { AppState } from 'src/app/core/reducers';

@Component({
	selector: 'sw-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	user$: Observable<User>;
	isLoggedIn$: Observable<boolean>;

	constructor(private permissionsService: NgxPermissionsService,
		private rolesService: NgxRolesService,
		private store: Store<AppState>) { }

	ngOnInit() {
		this.user$ = this.store.pipe(select(currentUser));
		this.isLoggedIn$ = this.store.pipe(select(isLoggedIn));

		var permissions = this.permissionsService.getPermissions();

		let roles = this.rolesService.getRoles();
		this.permissionsService.permissions$.subscribe((permissions) => {
			console.log(permissions)
		});
	}

	/**
	 * Log out
	 */
	logout() {
		this.store.dispatch(new Logout());
	}

}
