import { Injectable } from '@angular/core';
import { Supplier } from './supplier';

@Injectable({
	providedIn: 'root'
})
export class SupplierFactoryService {

	constructor() { }

	static empty(): Supplier {
		return {
			id: '',
			name: '',
			active: true,
			tstCreate: '',
			userCreate: ''
		};
	}
}
