import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { each, indexOf } from 'lodash';
import { find, first, map } from 'rxjs/operators';
import { Role, selectAllRoles, UserDeleted } from 'src/app/core/auth';
import { AppState } from 'src/app/core/reducers';
import { LayoutUtilsService, MessageType } from 'src/app/core/_base/crud';
import { User } from '../../../shared/user';
import { UserFactoryService } from '../../../shared/user-factory.service';
import { UserStoreService } from '../../../shared/user-store.service';

@Component({
	selector: 'rw-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {
	// Paginator
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	// Sort
	@ViewChild(MatSort, {static: true}) sort: MatSort;

	dataSource: MatTableDataSource<User>;

	allRoles: Role[];

	// Table Fields
	displayedColumns = ['username', 'fullname', 'email', 'company', 'roles', 'actions'];

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private userService: UserStoreService,
		private userFactory: UserFactoryService,
		private layoutUtilsService: LayoutUtilsService,
		private store: Store<AppState>
	) { }

	ngOnInit() {
		this.store.pipe(select(selectAllRoles)).subscribe(allRoles => { this.allRoles = allRoles as Role[]; });

		// If a New User was created --> Show Message
		this.route.queryParams
			.subscribe(queryParams => {
				if (queryParams.newUser === 'true') {
					const message = `Neuer Benutzer wurde erfolgreich angelegt.`;
					this.layoutUtilsService.showActionNotification(message, MessageType.Create, 10000, true, false);
				}
			});

		// If a Existing User was saved --> Show Message
		this.route.queryParams
			.subscribe(queryParams => {
				if (queryParams.editUser === 'true') {
					const message = `Benutzer wurde erfolgreich geändert.`;
					this.layoutUtilsService.showActionNotification(message, MessageType.Create, 10000, true, false);
				}
			});
	}

	/**
  * Set the paginator and sort after the view init since this component will
  * be able to query its view for the initialized paginator and sort.
  */
	ngAfterViewInit() {
		this.userService.getAllUsers().subscribe(data => {
			this.dataSource = new MatTableDataSource<User>(data);
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;
		});
	}

	doFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
	}

	selectedUser(id) {
		this.router.navigate(['..', 'user', id], { relativeTo: this.route});
	}

	/** ACTIONS */
	/**
	 * Redirect to edit page
	 */
	editUser(id) {
		this.router.navigate(['../users/edit', id], { relativeTo: this.route });
	}

	/**
	 * Delete user - here: set inactive
	 *
	 * @param item: User
	 */
	deleteUser(toDelete: User) {
		const title = 'User Delete';
		const description = 'Are you sure to permanently delete this user?';
		const waitDesciption = 'User is deleting...';
		const deleteMessage = `User has been deleted`;

		const dialogRef = this.layoutUtilsService.deleteElement(title, description, waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			this.userService.inactivateUser(toDelete.id).then(() => {
				this.layoutUtilsService.showActionNotification(deleteMessage, MessageType.Delete, 10000, true, false);
			}).catch(error => {
				this.layoutUtilsService.showActionNotification(error.message, MessageType.Delete, 10000, true, false);
			});
		});
	}

	/* UI */
	/**
	 * Returns RoleTitles string sperated with ' - '
	 *
	 * @param userRoles: number[]
	 */
	getRoleTitles(userRoles: number[]): string {
		return this.userFactory.getRoleTitlesAsString(userRoles, this.allRoles);
	}
}
