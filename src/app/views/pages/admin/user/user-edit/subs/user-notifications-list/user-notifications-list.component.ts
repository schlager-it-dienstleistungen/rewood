import { Component, Input, OnInit } from '@angular/core';
import { each, find, remove } from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { CategoryFactoryService } from 'src/app/views/pages/shared/category-factory.service';

@Component({
	selector: 'rw-user-notifications-list',
	templateUrl: './user-notifications-list.component.html',
	styleUrls: ['./user-notifications-list.component.scss']
})
export class UserNotificationsListComponent implements OnInit {
	@Input() loadingSubject = new BehaviorSubject<boolean>(false);
	@Input() categoryNotificationSubject = new BehaviorSubject<string[]>([]);

	// Categories
	allCategories = CategoryFactoryService.getCategories();
	unassignedCategories: string[] = [];
	assignedCategories: string[] = [];
	categoryForAdding = '';

	constructor() {}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {
		this.allCategories.forEach(category => {
			this.unassignedCategories.push(category.title);
		});

		each(this.categoryNotificationSubject.value, (firstC: string) => {
			const category = find(this.allCategories, oneCat => {
				return oneCat.title === firstC;
			});

			if (category) {
				this.assignedCategories.push(category.title);
				remove(this.unassignedCategories, (el) => el === category.title);
			}
		});
	}

	/**
	 * Assign Category
	 */
	assignCategory() {
		if (this.categoryForAdding === '') {
			return;
		}

		const category = find(this.allCategories, oneCat => {
			return oneCat.title === this.categoryForAdding;
		});

		if (category) {
			this.assignedCategories.push(category.title);
			remove(this.unassignedCategories, (el) => el === category.title);
			this.categoryForAdding = '';
			this.updateCategories();
		}
	}

	/**
	 * Unassign Category
	 *
	 * @param category: string
	 */
	unassingCategory(category: string) {
		this.categoryForAdding = '';
		this.unassignedCategories.push(category);
		remove(this.assignedCategories, el => el === category);
		this.updateCategories();
	}

	/**
	 * Update Categories
	 */
	updateCategories() {
		const categories = [];
		each(this.assignedCategories, elem => categories.push(elem));
		this.categoryNotificationSubject.next(categories);
	}
}
