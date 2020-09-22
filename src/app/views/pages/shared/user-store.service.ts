import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user';
import { UserFactoryService } from './user-factory.service';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable({
	providedIn: 'root'
})
export class UserStoreService {

	constructor(private db: AngularFirestore) {}

	getAllUsers(): Observable<User[]> {
		const usersFS: AngularFirestoreCollection<User> = this.db.collection('users');
		return usersFS.snapshotChanges().pipe(
			map(users => {
				return users.map(user => UserFactoryService.fromFirestoreDocumentChangeAction(user));
			})
		);
	}

	getUser(userId: string): Observable<User> {
		return this.db.collection('users').doc(userId).snapshotChanges().pipe(
			map(product => UserFactoryService.fromFirestoreDocument(product.payload.data() as User, product.payload.id))
		);
	}

	createUserId(): string {
		return this.db.createId();
	}

	/**
	 * Stores the given User and Updates Firebase-AuthenticationEntry if necessary
	 *
	 * @param user User to save
	 */
	storeUser(user: User): Promise<void> {
		// Create Firestore-Batch
		const batch = this.db.firestore.batch();

		// Store new User
		const userRef = this.db.collection('users').doc(user.id).ref;
		batch.set(userRef, user);

		// Batch Commit
		return batch.commit();
	}

}
