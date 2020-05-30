import { Injectable } from '@angular/core';
import { Product } from './product';
import { DocumentChangeAction } from 'angularfire2/firestore';

@Injectable({
	providedIn: 'root'
})
export class ProductFactoryService {

	static fromFirestoreDocumentChangeAction(product: DocumentChangeAction<Product>): Product {
		return ProductFactoryService.fromFirestoreDocument(product.payload.doc.data() as Product, product.payload.doc.id);
	}

	static fromFirestoreDocument(data: Product, id: string): Product {
		return { id, ...data };
	}

	static empty(): Product {
		return {
			id: '',
			title: '',
			description: '',
			category: '',
			price: 0.00,
			status: 0,
			pictures: []
		};
	}
}
