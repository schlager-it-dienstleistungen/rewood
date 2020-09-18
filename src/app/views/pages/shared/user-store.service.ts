import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user';
import { UserFactoryService } from './user-factory.service';

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

}
