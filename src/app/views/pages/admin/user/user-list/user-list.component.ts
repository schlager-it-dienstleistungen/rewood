import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Role, selectAllRoles } from 'src/app/core/auth';
import { AppState } from 'src/app/core/reducers';
import { MessageType, NotificationService } from '../../../shared/notification.service';
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
	isLoading = false;

	allRoles: Role[];

	// Table Fields
	displayedColumns = ['username', 'fullname', 'email', 'company', 'roles', 'actions'];

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private userService: UserStoreService,
		private userFactory: UserFactoryService,
		private notificationService: NotificationService,
		private store: Store<AppState>
	) { }

	ngOnInit() {
		this.isLoading = true;

		this.store.pipe(select(selectAllRoles)).subscribe(allRoles => { this.allRoles = allRoles as Role[]; });

		// If a New User was created --> Show Message
		this.route.queryParams
			.subscribe(queryParams => {
				if (queryParams.newUser === 'true') {
					const message = `Neuer Benutzer wurde erfolgreich angelegt.`;
					this.notificationService.showActionNotification(message, MessageType.Create);
				}
			});

		// If a Existing User was saved --> Show Message
		this.route.queryParams
			.subscribe(queryParams => {
				if (queryParams.editUser === 'true') {
					const message = `Benutzer wurde erfolgreich geändert.`;
					this.notificationService.showActionNotification(message, MessageType.Create);
				}
			});
	}

	/**
  * Set the paginator and sort after the view init since this component will
  * be able to query its view for the initialized paginator and sort.
  */
	ngAfterViewInit() {
		this.userService.getAllActiveUsers().subscribe(data => {
			this.isLoading = false;
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

		const dialogRef = this.notificationService.deleteElement(title, description, waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			this.userService.inactivateUser(toDelete).then(() => {
				this.notificationService.showActionNotification(deleteMessage, MessageType.Delete);
			}).catch(error => {
				this.notificationService.showActionNotification(error.message, MessageType.Delete);
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
