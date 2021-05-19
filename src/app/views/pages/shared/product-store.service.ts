import { Injectable } from '@angular/core';
import { Product } from './product';
import { Category } from './category';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { Observable, throwError } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { ProductFactoryService } from './product-factory.service';
import { CategoryFactoryService } from './category-factory.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from 'angularfire2/storage';
import { Picture } from './picture';

@Injectable({
	providedIn: 'root'
})
export class ProductStoreService {

	constructor(
		private afs: AngularFirestore,
		private afAuth: AngularFireAuth,
		private storage: AngularFireStorage
	) {}

	getAllProducts(): Observable<Product[]> {
		const productsFS: AngularFirestoreCollection<Product> = this.afs.collection('products');
		return productsFS.snapshotChanges().pipe(
			map(products => {
				return products.map(product => ProductFactoryService.fromFirestoreDocumentChangeAction(product));
			})
		);
	}

	getAllActiveProducts(): Observable<Product[]> {
		const productsFS: AngularFirestoreCollection<Product> = this.afs.collection('products',
			ref => ref.where('active', '==', true));
		return productsFS.snapshotChanges().pipe(
			map(products => {
				return products.map(product => ProductFactoryService.fromFirestoreDocumentChangeAction(product));
			})
		);
	}

	/**
	 * Gets all active Products filtered by SupplierNumber -> only acitve products from the specified supplier
	 *
	 * @param supplierNumber supplierNumber to filter
	 */
	getAllActiveProductsBySupplier(supplierNumber: number): Observable<Product[]> {
		const productsFS: AngularFirestoreCollection<Product> = this.afs.collection('products',
			ref => ref.where('active', '==', true));
		return productsFS.snapshotChanges().pipe(
			map(products => {
				return products
					.map(product => ProductFactoryService.fromFirestoreDocumentChangeAction(product))
					.filter(product => product.supplierNumber === supplierNumber);
			})
		);
	}

	getLatestProducts(): Observable<Product[]> {
		const productsFS: AngularFirestoreCollection<Product> = this.afs.collection('products',
			ref => ref
				.where('active', '==', true)
				.orderBy('tstCreate', 'desc')
				.limit(3));
		return productsFS.snapshotChanges().pipe(
			map(products => {
				return products.map(product => ProductFactoryService.fromFirestoreDocumentChangeAction(product));
			})
		);
	}

	getProductsToCategory(category: string): Observable<Product[]> {
		const productsFS: AngularFirestoreCollection<Product> = this.afs.collection('products',
			ref => ref.where('category', '==', category));
		return productsFS.snapshotChanges().pipe(
			map(products => {
				return products.map(product => ProductFactoryService.fromFirestoreDocumentChangeAction(product));
			})
		);
	}

	getActiveProductsToCategory(category: string): Observable<Product[]> {
		const productsFS: AngularFirestoreCollection<Product> = this.afs.collection('products',
			ref => ref.where('category', '==', category).where('active', '==', true));
		return productsFS.snapshotChanges().pipe(
			map(products => {
				return products.map(product => ProductFactoryService.fromFirestoreDocumentChangeAction(product));
			})
		);
	}

	getProduct(productId: string): Observable<Product> {
		return this.afs.collection('products').doc(productId).snapshotChanges().pipe(
			map(product => ProductFactoryService.fromFirestoreDocument(product.payload.data() as Product, product.payload.id))
		);
	}

	/**
	 * Creates a unique ProductId via Angular Firestore
	 */
	createProductId(): string {
		return this.afs.createId();
	}

	/**
	 * Creates the next unique ProductNumber and sets it (and the ReferenceNumber)
	 */
	async createAndSetProductAndReferenceNumber(product: Product) {
		const productCounterRef = this.afs.collection('counters').doc('product').ref;
		firebase.firestore().runTransaction(async t => {
			const productNumber = await (await t.get(productCounterRef)).data().next;
			product.productNumber = productNumber;
			this.createAndSetReferenceNumber(product);
			t.update(productCounterRef, { next: productNumber + 1});

		}).then(result => {
			console.log('Transaction success, productNumber:' +  product.productNumber + ', productReferenceNumber: ' + product.productReferenceNumber + '; result: ' + result);
		}).catch(error => {
			console.error('Transaction error: ' + error);
		});
	}

	/**
	 * Creates a new Referencenumber with the given SupplierNr and ProductNr
	 *
	 * @param product given product
	 */
	createAndSetReferenceNumber(product: Product) {
		product.productReferenceNumber = product.supplierNumber + '' + product.productNumber;
	}

	/**
	 * Store the given Product and increase CategoryCount if NewProduct
	 *
	 * @param product Product to save
	 * @param isNewProduct New Product or existing Product to save
	 */
	storeProduct(product: Product, isNewProduct: boolean): Promise<void> {
		const incrementCounter = firebase.firestore.FieldValue.increment(1);

		// Create Firestore-Batch
		const batch = this.afs.firestore.batch();

		// Store/Delete Pictures in Storage
		this.mapPictures(product);

		// Store new Product
		const productRef = this.afs.collection('products').doc(product.id).ref;
		this.addMetadata(product, isNewProduct, false);
		batch.set(productRef, product);

		// Increment Category counter
		if (isNewProduct) {
			const categoryCountRef = this.afs.collection('productcount').doc(product.category).ref;
			batch.set(categoryCountRef, { count: incrementCounter }, {merge: true });
		}

		// Batch Commit
		return batch.commit();
	}

	mapPictures(product: Product) {
		const picturesToStore: Picture[] = [];
		product.pictures.forEach(picture => {

			// Delete picture
			if(picture.toDelete) {
				this.storage.ref(picture.path).delete();
			} else {
				picturesToStore.push(picture);
			}
		});
		product.pictures = picturesToStore;
	}

	/**
	 * Deactivate Product and decrease the count for categors
	 *
	 * @param product Product to deactivate
	 */
	inactivateSupplier(product: Product): Promise<void> {
		const incrementCounter = firebase.firestore.FieldValue.increment(-1);

		// Create Firestore-Batch
		const batch = this.afs.firestore.batch();

		// Store new Product
		const productRef = this.afs.collection('products').doc(product.id).ref;
		this.addMetadata(product, false, true);
		product.active = false;
		batch.set(productRef, product);

		// Decrease CategoryCounter
		const categoryCountRef = this.afs.collection('productcount').doc(product.category).ref;
		batch.set(categoryCountRef, { count: incrementCounter }, {merge: true });

		// Batch Commit
		return batch.commit();
	}

	/**
	 * Store the given Product and increases the counter for this Category of Product
	 *
	 * @param product Product to save
	 * @deprecated
	 */
	createProduct(product: Product): Promise<void> {
		const incrementCounter = firebase.firestore.FieldValue.increment(1);

		// Create Firestore-Batch
		const batch = this.afs.firestore.batch();

		// Store new Product
		const productRef = this.afs.collection('products').doc(product.id).ref;
		this.addMetadata(product, false, false);
		batch.set(productRef, product);

		// Increment Category counter
		const categoryCountRef = this.afs.collection('productcount').doc(product.category).ref;
		batch.set(categoryCountRef, { count: incrementCounter }, {merge: true });

		// Batch Commit
		return batch.commit();
	}

	addMetadata(product: Product, isNewProduct: boolean, isDeleteProduct: boolean) {
		const tst = firebase.firestore.FieldValue.serverTimestamp();
		const userId = this.afAuth.auth.currentUser.uid;

		if (isDeleteProduct) {
			product.tstDelete = tst;
			product.userDelete = userId;
		} else if (isNewProduct) {
			product.tstCreate = tst;
			product.userCreate = userId;
		} else {
			product.tstUpdate = tst;
			product.userUpdate = userId;
		}
	}

	/**
	 * Returns description, image and availabe products to the given Category-Title
	 *
	 * @param title Category-Title
	 */
	getCategory(title: string): Category {
		const categoriesArray: Category[] = CategoryFactoryService.getCategories();
		const category: Category = categoriesArray.find(oneCategory => oneCategory.title.indexOf(title) !== -1);

		// Read the available Product to the Category from Firestore
		this.afs.firestore.collection('productcount').doc(category.title).get().then(
			(doc) => {
				category.numberofproducts = doc.data().count;
			}
		);

		return category;
	}

	/**
	 * Changes state of product to booked
	 *
	 * @param product Product to book
	 */
	bookProduct(product: Product): Promise<void> {
		// Create Firestore-Batch
		const batch = this.afs.firestore.batch();

		// Store new Product
		const productRef = this.afs.collection('products').doc(product.id).ref;
		this.addMetadata(product, false, false);
		product.status = 1;

		// Set Booked User and Tst from MetaData
		product.booking.userBooking = product.userUpdate;
		product.booking.tstBooking = product.tstUpdate;

		batch.set(productRef, product);

		// Batch Commit
		return batch.commit();
	}

	// UI
	/**
	 * Returns status string
	 *
	 * @param status: number
	 */
	getItemStatusString(status: number = 0): string {
		switch (status) {
			case 0:
				return 'gültig';
			case 1:
				return 'reserviert';
			case 2:
				return 'verkauft';
		}
		return '';
	}

	/**
	 * Returns CSS Class by status
	 *
	 * @param status: number
	 */
	getItemCssClassByStatus(status: number = 0): string {
		switch (status) {
			case 0:
				return 'success';
			case 1:
				return 'warning';
			case 2:
				return 'danger';
		}
		return '';
	}

	isAvailable(status: number = 0): boolean {
		if(status === 0) {
			return true;
		}

		return false;
	}
}
