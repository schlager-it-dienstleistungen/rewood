import { Injectable } from '@angular/core';
import { DocumentChangeAction } from 'angularfire2/firestore';
import { Role } from 'src/app/core/auth';
import { User } from './user';

@Injectable({
	providedIn: 'root'
})
export class UserFactoryService {

	constructor() { }

	static fromFirestoreDocumentChangeAction(user: DocumentChangeAction<User>): User {
		return UserFactoryService.fromFirestoreDocument(user.payload.doc.data() as User, user.payload.doc.id);
	}

	static fromFirestoreDocument(data: User, id: string): User {
		return { id, ...data};
	}

	static empty(): User {
		return {
			id: '',
			authUid: '',
			username: '',
			firstname: '',
			lastname: '',
			email: '',
			companyName: '',
			roles: [],
			categoryNotifications: [],
			emailVerified: false,
			active: true
		};
	}

	/**
	 * Returns RoleTitles string sperated with ' - '
	 *
	 * @param userRoles: number[]
	 * @param allRoles: Role[]
	 */
	getRoleTitlesAsString(userRoles: number[], allRoles: Role[]): string {
		let rolesTitle = '';
		userRoles.forEach(roleId => {
			const oneRole = allRoles.find(innerRole => innerRole.id === roleId);
			rolesTitle = rolesTitle + (rolesTitle.length > 0 ? ' - ' : '') + oneRole.title;
		});

		return rolesTitle;
	}
}
