import { Injectable } from '@angular/core';
import { Product } from './product';
import { Category } from './category';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductFactoryService } from './product-factory.service';
import { CategoryFactoryService } from './category-factory.service';

@Injectable({
	providedIn: 'root'
})
export class ProductStoreService {

	constructor(private db: AngularFirestore) {}

	getAllProducts(): Observable<Product[]> {
		const productsFS: AngularFirestoreCollection<Product> = this.db.collection('products');
		return productsFS.snapshotChanges().pipe(
			map(products => {
				return products.map(product => ProductFactoryService.fromFirestoreDocumentChangeAction(product));
			})
		);
	}

	getProductsToCategory(category: string): Observable<Product[]> {
		const productsFS: AngularFirestoreCollection<Product> = this.db.collection('products', ref => ref.where('category', '==', category));
		return productsFS.snapshotChanges().pipe(
			map(products => {
				return products.map(product => ProductFactoryService.fromFirestoreDocumentChangeAction(product));
			})
		);
	}

	getProduct(productId: string): Observable<Product> {
		return this.db.collection('products').doc(productId).snapshotChanges().pipe(
			map(product => ProductFactoryService.fromFirestoreDocument(product.payload.data() as Product, product.payload.id))
		);
	}

	createProductId(): string {
		return this.db.createId();
	}

	/**
	 * Store the given Product and increases the counter for this Category of Product
	 *
	 * @param product Product to save
	 */
	createProduct(product: Product): Promise<void> {
		const incrementCounter = firebase.firestore.FieldValue.increment(1);

		// Create Firestore-Batch
		const batch = this.db.firestore.batch();

		// Store new Product
		const productRef = this.db.collection('products').doc(product.id).ref;
		batch.set(productRef, product);

		// Increment Category counter
		const categoryCountRef = this.db.collection('products').doc('count_' + product.category).ref;
		batch.set(categoryCountRef, { count: incrementCounter }, {merge: true });

		// Batch Commit
		return batch.commit();
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
		this.db.firestore.collection('products').doc('count_' + category.title).get().then(
			(doc) => {
				category.numberofproducts = doc.data().count;
			}
		);

		return category;
	}

		/* UI */
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
}
