import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
	providedIn: 'root'
})
export class SupplierStoreService {

	constructor(
		private afs: AngularFirestore,		// Inject Firestore Service
		private afAuth: AngularFireAuth		// Inject Firebase auth Service
		) { }

		createSupplierId(): string {
		return this.afs.createId();
	}
}
