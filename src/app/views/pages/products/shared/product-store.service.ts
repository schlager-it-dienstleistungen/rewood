import { Injectable } from '@angular/core';
import { Product } from './product';
import { SearchProducts } from './search-products';

@Injectable({
	providedIn: 'root'
})
export class ProductStoreService {

	constructor() {}

	getAllProducts(): Product[] {
		return this.getProducts();
	}

	searchProducts(searchInput: SearchProducts): Product[] {
		let products: Product [] = this.getProducts();

		if (searchInput.title) {
			products = products.filter((product) => product.title.indexOf(searchInput.title) !== -1);
		}
		if (searchInput.category) {
			products = products.filter((product) => product.category.indexOf(searchInput.category) !== -1);
		}

		return products;
	}

	/**
	 * Load Products List
	 */
	private getProducts(): Product[] {
		return [
			{
				id: '1',
				title: 'Spanplatte',
				category: 'Spanplatte',
				subcategory: '',
				price: 10500,
				description: 'um 2 Zentimeter zu kurz',
				picture: 'https://media.bahag.com/assets/resp_product/10/75/1075985_22086959.jpg'
			},
			{
				id: '2',
				title: 'Pfosten',
				category: 'Bauholz',
				subcategory: 'Pfosten',
				price: 1500.55,
				description: '2,53 statt 2,50 Meter',
				picture: 'https://www.hornbach.at/data/shop/D04/001/780/494/398/61/DV_8_4005034_01_4c_AT_20140605140033.jpg'
			},
			{
				id: '3',
				title: 'Laminiertes Brett',
				category: 'Brett',
				price: 25000,
				description: 'mit Buche statt Eiche furniert',
				picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTej6WQUzMwU3MfotKm2LrHc_bgMxkhHIhVpiTSO9YemGi8QVas'
			},
			{
				id: '4',
				title: 'Rigips',
				category: 'kein Holz',
				price: 9999.99,
				description: 'Leider kein Holz',
				picture: 'https://online.muehl24.de/pub/media/catalog/product/cache/c9e0b0ef589f3508e5ba515cde53c5ff/4/0/4002806407188..jpg'
			}
		];
	}
}
