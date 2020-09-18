import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { User } from '../../shared/user';
import { UserStoreService } from '../../shared/user-store.service';

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

	// Table Fields
	displayedColumns = ['username', 'fullname', 'email', 'company', 'roles'];

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private userService: UserStoreService
	) { }

	ngOnInit() {
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

}
