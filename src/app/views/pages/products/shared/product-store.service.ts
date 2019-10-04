import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
	providedIn: 'root'
})
export class ProductStoreService {
	products: Product[];

	constructor() {
		this.initProducts();
	}

	getAllProducts(): Product[] {
		return this.products;
	}

	/**
	 * Load Products List
	 */
	private initProducts() {
		this.products = [
			{
				id: '1',
				title: 'Spanplatte',
				category: 'Spanplatte',
				subcategory: '',
				price: 10500,
				description: 'um 2 Zentimeter zu kurz'
			},
			{
				id: '2',
				title: 'Pfosten',
				category: 'Bauholz',
				subcategory: 'Pfosten',
				price: 1500.55,
				description: '2,53 statt 2,50 Meter'
			},
			{
				id: '3',
				title: 'Laminiertes Brett',
				category: 'Brett',
				price: 25000,
				description: 'mit Buche statt Eiche furniert'
			},
			{
				id: '4',
				title: 'Rigips',
				category: 'kein Holz',
				price: 9999.99,
				description: 'Leider kein Holz'
			}
		];
	}
}
