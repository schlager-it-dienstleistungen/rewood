import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryFactoryService } from './category-factory.service';
import { Supplier } from './supplier';
import { SupplierFactoryService } from './supplier-factory.service';

@Injectable({
	providedIn: 'root'
})
export class SupplierStoreService {

	constructor(
		private afs: AngularFirestore,		// Inject Firestore Service
		private afAuth: AngularFireAuth		// Inject Firebase auth Service
		) { }

	getAllActiveSuppliers(): Observable<Supplier[]> {
		const suppliersFS: AngularFirestoreCollection<Supplier> = this.afs.collection('suppliers',
			ref => ref.where('active', '==', true));
		return suppliersFS.snapshotChanges().pipe(
			map(suppliers => {
				return suppliers.map(supplier => SupplierFactoryService.fromFirestoreDocumentChangeAction(supplier));
			})
		);
	}

	getSupplier(supplierId: string): Observable<Supplier> {
		return this.afs.collection('suppliers').doc(supplierId).snapshotChanges().pipe(
			map(product => SupplierFactoryService.fromFirestoreDocument(product.payload.data() as Supplier, product.payload.id))
		);
	}

	createSupplierId(): string {
		return this.afs.createId();
	}

	/**
	 * Store the given Supplier
	 *
	 * @param supplier Supplier to save
	 * @param isNewSupplier New Supplier or existing Supplier to save
	 */
	async storeSupplier(supplier: Supplier, isNewSupplier: boolean): Promise<void> {
		// Store new Product
		const supplierRef = this.afs.collection('suppliers').doc(supplier.id).ref;
		this.addMetadata(supplier, isNewSupplier, false);

		// Get Next SupplierNumber and Increase
		if(isNewSupplier){
			const supplierCounterRef = this.afs.collection('counters').doc('supplier').ref;
			firebase.firestore().runTransaction(async t => {
				const supplierNumber = await (await t.get(supplierCounterRef)).data().next;
				supplier.supplierNumber = supplierNumber;

				t.update(supplierCounterRef, { next: supplierNumber + 1});

			}).then(result => {
				console.log('Transaction success, supplierNumber:' +  supplier.supplierNumber);
				// Create new Supplier
				return supplierRef.set(supplier);

			}).catch(err => {
				console.log('Transaction failure:', err);
				return Promise.reject('Error to create new SupplierNumber. Exception: ' + err);
			});

		// Edit existing Supplier
		}else{
			return supplierRef.set(supplier);
		}
	}

	/**
	 * Deactivate supplier
	 *
	 * @param supplier supplier to deactivate
	 */
	inactivateSupplier(supplier: Supplier): Promise<void> {
		// Create Firestore-Batch
		const batch = this.afs.firestore.batch();

		// Store new Product
		const supplierRef = this.afs.collection('suppliers').doc(supplier.id).ref;
		this.addMetadata(supplier, false, true);
		supplier.active = false;
		batch.set(supplierRef, supplier);

		// Batch Commit
		return batch.commit();
	}

	addMetadata(supplier: Supplier, isNewSupplier: boolean, isDeleteSupplier: boolean) {
		const tst = firebase.firestore.FieldValue.serverTimestamp();
		const userId = this.afAuth.auth.currentUser.uid;

		if (isDeleteSupplier) {
			supplier.tstDelete = tst;
			supplier.userDelete = userId;
		} else if (isNewSupplier) {
			supplier.tstCreate = tst;
			supplier.userCreate = userId;
		} else {
			supplier.tstUpdate = tst;
			supplier.userUpdate = userId;
		}
	}
}
