import { Injectable } from '@angular/core';
import { Product } from './product';
import { SearchProducts } from './search-products';
import { Category } from './category';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
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

	createProduct(product: Product) {
		this.db.collection('products').doc(product.id).set(product);
	}

	getCategory(title: string): Category {
		const categoriesArray: Category[] = CategoryFactoryService.getCategories();
		return categoriesArray.find(category => category.title.indexOf(title) !== -1);
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
