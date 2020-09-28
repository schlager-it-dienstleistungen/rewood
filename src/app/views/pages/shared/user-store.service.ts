import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user';
import { UserFactoryService } from './user-factory.service';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
	providedIn: 'root'
})
export class UserStoreService {

	constructor(
		private afs: AngularFirestore,		// Inject Firestore Service
		private afAuth: AngularFireAuth		// Inject Firebase auth Service
		)	{}

	getAllActiveUsers(): Observable<User[]> {
		const usersFS: AngularFirestoreCollection<User> = this.afs.collection('users',
			ref => ref.where('active', '==', true));
		return usersFS.snapshotChanges().pipe(
			map(users => {
				return users.map(user => UserFactoryService.fromFirestoreDocumentChangeAction(user));
			})
		);
	}

	getUser(userId: string): Observable<User> {
		return this.afs.collection('users').doc(userId).snapshotChanges().pipe(
			map(product => UserFactoryService.fromFirestoreDocument(product.payload.data() as User, product.payload.id))
		);
	}

	createUserId(): string {
		return this.afs.createId();
	}

	/**
	 * Stores the given User and Updates Firebase-AuthenticationEntry if necessary
	 *
	 * @param user User to save
	 * @param isNewUser New User or existing User to save
	 */
	storeUser(user: User, isNewUser: boolean): Promise<void> {
		// Collection where to store the user
		const collection = isNewUser ? 'newUsers' : 'users';

		// Add Metadata
		this.addMetadata(user, isNewUser);

		// Create Firestore-Batch
		const batch = this.afs.firestore.batch();

		// Store new User
		const userRef = this.afs.collection(collection).doc(user.id).ref;
		batch.set(userRef, user);

		// Update Timestamp


		// Batch Commit
		return batch.commit();
	}

	addMetadata(user: User, isNewUser: boolean) {
		const tst = firebase.firestore.FieldValue.serverTimestamp();
		const userId = this.afAuth.auth.currentUser.uid;

		if (isNewUser) {
			user.tstCreate = tst;
			user.userCreate = userId;
		} else {
			user.tstUpdate = tst;
			user.userUpdate = userId;
		}
	}

	/**
	 * Deletes Firebase Authentication User
	 *
	 * @deprecated
	 */
	deleteAuthUser(): Promise<void> {
		return this.afAuth.auth.currentUser.delete();
	}

	/**
	 * Deaktiviere User
	 *
	 * @param user User to deactivate
	 */
	inactivateUser(user: User): Promise<void> {
		// Create Firestore-Batch
		const batch = this.afs.firestore.batch();

		// Store User to Inactivate
		const userRef = this.afs.collection('delUsers').doc(user.id).ref;
		const tst = firebase.firestore.FieldValue.serverTimestamp();
		const userId = this.afAuth.auth.currentUser.uid;
		batch.set(userRef, {authUid: user.authUid, tstDelete: tst, userDelete: userId});

		// Batch Commit
		return batch.commit();
	}

}
