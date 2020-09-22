// Angular
import { Component, OnInit, Input } from '@angular/core';
// RxJS
import { BehaviorSubject, Observable } from 'rxjs';
// NGRX
import { Store, select } from '@ngrx/store';
// Lodash
import { each, find, remove } from 'lodash';
// State
import { AppState } from 'src/app/core/reducers';
// Auth
import { Role, selectAllRoles } from 'src/app/core/auth';

@Component({
	selector: 'rw-user-roles-list',
	templateUrl: './user-roles-list.component.html',
	styleUrls: ['./user-roles-list.component.scss']
})
export class UserRolesListComponent implements OnInit {
	@Input() loadingSubject = new BehaviorSubject<boolean>(false);
	@Input() rolesSubject: BehaviorSubject<number[]>;

	// Roles
	allUserRoles$: Observable<Role[]>;
	allRoles: Role[] = [];
	unassignedRoles: Role[] = [];
	assignedRoles: Role[] = [];
	roleIdForAdding: number;

	/**
	 * Component constructor
	 *
	 * @param store: Store<AppState>
	 */
	constructor(private store: Store<AppState>) {}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {
		this.allUserRoles$ = this.store.pipe(select(selectAllRoles));
		this.allUserRoles$.subscribe((res: Role[]) => {
			each(res, (role: Role) => {
				this.allRoles.push(role);
				this.unassignedRoles.push(role);
			});

			each(this.rolesSubject.value, (roleId: number) => {
				const role = find(this.allRoles, (r: Role) => {
					return r.id === roleId;
				});

				if (role) {
					this.assignedRoles.push(role);
					remove(this.unassignedRoles, (el) => el.id === role.id);
				}
			});
		});
	}

	/**
	 * Assign role
	 */
	assignRole() {
		if (this.roleIdForAdding === 0) {
			return;
		}

		const role = find(this.allRoles, (r: Role) => {
			return r.id === (+this.roleIdForAdding);
		});

		if (role) {
			this.assignedRoles.push(role);
			remove(this.unassignedRoles, (el) => el.id === role.id);
			this.roleIdForAdding = 0;
			this.updateRoles();
		}
	}

	/**
	 * Unassign role
	 *
	 * @param role: Role
	 */
	unassingRole(role: Role) {
		this.roleIdForAdding = 0;
		this.unassignedRoles.push(role);
		remove(this.assignedRoles, el => el.id === role.id);
		this.updateRoles();
	}

	/**
	 * Update roles
	 */
	updateRoles() {
		const roles = [];
		each(this.assignedRoles, elem => roles.push(elem.id));
		this.rolesSubject.next(roles);
	}

}
