import { Injectable } from '@angular/core';
import { DocumentChangeAction } from 'angularfire2/firestore';
import { Supplier } from './supplier';

@Injectable({
	providedIn: 'root'
})
export class SupplierFactoryService {

	constructor() { }

	static fromFirestoreDocumentChangeAction(supplier: DocumentChangeAction<Supplier>): Supplier {
		return SupplierFactoryService.fromFirestoreDocument(supplier.payload.doc.data() as Supplier, supplier.payload.doc.id);
	}

	static fromFirestoreDocument(data: Supplier, id: string): Supplier {
		return { id, ...data};
	}

	static empty(): Supplier {
		return {
			id: '',
			name: '',
			active: true,
			tstCreate: '',
			userCreate: '',
			uid: '',
			fsc: false,
			pefc: false
		};
	}
}
