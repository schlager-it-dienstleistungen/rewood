import { Injectable } from '@angular/core';
import { DocumentChangeAction } from 'angularfire2/firestore';
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
}
