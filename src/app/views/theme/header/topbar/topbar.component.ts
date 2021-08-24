// Angular
import { Component, HostBinding, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { currentUser, Logout, User } from 'src/app/core/auth';
import { AppState } from 'src/app/core/reducers';
import { TranslationService } from 'src/app/core/_base/layout';

@Component({
	selector: 'kt-topbar',
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {

	@HostBinding('class') classes: string = 'kt-header__topbar kt-grid__item';
	// Public properties
	user$: Observable<User>;

	/**
	 * Component constructor
	 *
	 * @param store: Store<AppState>
	 */
	constructor(
		private store: Store<AppState>,
		private router: Router,
		private translationService: TranslationService
	) {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		this.user$ = this.store.pipe(select(currentUser));

		this.setSelectedLanguage();
		this.router.events
			.pipe(filter(event => event instanceof NavigationStart))
			.subscribe(event => {
				this.setSelectedLanguage();
			});
	}

	/**
	 * Log out
	 */
	logout() {
		this.store.dispatch(new Logout());
	}

	/**
	 * Log in
	 */
	login() {
		this.router.navigate(['/auth/login']);
	}

	setLanguage(lang) {
		this.translationService.setLanguage(lang);
	}

	/**
	 * Set selected language
	 */
	 setSelectedLanguage(): any {
		this.setLanguage(this.translationService.getSelectedLanguage());
	}
}
