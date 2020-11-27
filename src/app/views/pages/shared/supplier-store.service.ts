import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Supplier } from './supplier';

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

	/**
	 * Store the given Supplier
	 *
	 * @param supplier Supplier to save
	 * @param isNewSupplier New Supplier or existing Supplier to save
	 */
	storeSupplier(supplier: Supplier, isNewSupplier: boolean): Promise<void> {
		// Create Firestore-Batch
		const batch = this.afs.firestore.batch();

		// Store new Product
		const supplierRef = this.afs.collection('suppliers').doc(supplier.id).ref;
		this.addMetadata(supplier, isNewSupplier);
		batch.set(supplierRef, supplier);

		// Batch Commit
		return batch.commit();
	}

	addMetadata(supplier: Supplier, isNewSupplier: boolean) {
		const tst = firebase.firestore.FieldValue.serverTimestamp();
		const userId = this.afAuth.auth.currentUser.uid;

		if (isNewSupplier) {
			supplier.tstCreate = tst;
			supplier.userCreate = userId;
		} else {
			supplier.tstUpdate = tst;
			supplier.userUpdate = userId;
		}
	}
}
