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
			dimension: {
				length: 0,
				width: 0,
				height: 0,
				quantity: 0
			},
			price: 0.00,
			status: 0,
			pictures: []
		};
	}
}
