import { Injectable } from '@angular/core';
import { Product } from './product';
import { SearchProducts } from './search-products';
import { Category } from './category';

@Injectable({
	providedIn: 'root'
})
export class ProductStoreService {

	constructor() {}

	getAllProducts(): Product[] {
		return this.getProducts();
	}

	/**
	 * TODO Replace with Dataservice
	 */
	searchProducts(searchInput: SearchProducts): Product[] {
		let products: Product [] = this.getProducts();

		if (searchInput.title) {
			products = products.filter(product => product.title.indexOf(searchInput.title) !== -1);
		}
		if (searchInput.category) {
			products = products.filter(product => product.category.indexOf(searchInput.category) !== -1);
		}
		if (searchInput.price_from) {
			products = products.filter(product => product.price >= searchInput.price_from);
		}
		if (searchInput.price_to) {
			products = products.filter(product => product.price <= searchInput.price_to);
		}

		return products;
	}

	/**
	 * TODO Replace with Dataservice
	 */
	getProduct(id: string): Product {
		const products: Product [] = this.getProducts();
		return products.find(product => product.id === id);
	}

	/**
	 * Load Products List
	 */
	private getProducts(): Product[] {
		return [
			{
				id: '1',
				title: 'Spanplatte zu kurz',
				category: 'Spanplatte',
				subcategory: '',
				price: 10500,
				description: 'um 2 Zentimeter zu kurz',
				picture: 'https://media.bahag.com/assets/resp_product/10/75/1075985_22086959.jpg',
				status: 0
			},
			{
				id: '2',
				title: 'Spanplatte zu lang',
				category: 'Spanplatte',
				subcategory: '',
				price: 1500.55,
				description: '2,53 statt 2,50 Meter',
				picture: 'https://media.bahag.com/assets/resp_product/10/75/1075985_22086959.jpg',
				status: 2
			},
			{
				id: '3',
				title: 'OSB falsch furniert',
				category: 'OSB',
				price: 25000,
				description: 'mit Buche statt Eiche furniert',
				picture: 'https://balkotrade.com/media/catalog/product/cache/4/image/9df78eab33525d08d6e5fb8d27136e95/e/g/egger_osb-3_6_4.jpg',
				status: 1
			},
			{
				id: '4',
				title: 'dunkles Sperrholz',
				category: 'Sperrholz',
				price: 9999.99,
				description: 'Sperrholz mit leichter Dunkelfärbung',
				picture: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Spruce_plywood.JPG',
				status: 0
			},
			{
				id: '5',
				title: 'Tischlerplatte geästet',
				category: 'Tischlerplatte',
				price: 27500,
				description: 'Tischlerplatte mit Ästen',
				picture: 'https://feafashionloft.de/wp-content/uploads/2019/02/Tischlerplatte-1.jpg',
				status: 0
			},
			{
				id: '6',
				title: 'Birkensperrholz',
				category: 'Sperrholz',
				price: 10000,
				description: 'mit Klöpfer',
				picture: 'https://i.ebayimg.com/images/g/gs8AAOSwVaVZy~m2/s-l300.jpg',
				status: 2
			},
			{
				id: '7',
				title: 'HDF gemischt',
				category: 'HDF',
				price: 20000,
				description: 'gemischte Laminierungen',
				picture: 'https://5.imimg.com/data5/SL/YW/BT/SELLER-82461688/prelaminated-mdf-board-500x500.jpg',
				status: 2
			}
		];
	}

	getCategories(): Category[] {
		return [
			{
				title: 'Spanplatte',
				description: 'Beschreibungstext',
				img: 'https://media.bahag.com/assets/resp_product/10/75/1075985_22086959.jpg',
				numberofproducts: 5
			},
			{
				title: 'OSB',
				description: 'Beschreibungstext',
				img: 'https://balkotrade.com/media/catalog/product/cache/4/image/9df78eab33525d08d6e5fb8d27136e95/e/g/egger_osb-3_6_4.jpg',
				numberofproducts: 0
			},
			{
				title: 'MDF',
				description: 'Beschreibungstext',
				img: 'https://images-na.ssl-images-amazon.com/images/I/51OJDffRtFL._SY355_.jpg',
				numberofproducts: 3
			},
			{
				title: 'HDF',
				description: 'Beschreibungstext',
				img: 'https://5.imimg.com/data5/SL/YW/BT/SELLER-82461688/prelaminated-mdf-board-500x500.jpg',
				numberofproducts: 1
			},
			{
				title: 'Sperrholz',
				description: 'Beschreibungstext',
				img: 'https://i.ebayimg.com/images/g/gs8AAOSwVaVZy~m2/s-l300.jpg',
				numberofproducts: 0
			},
			{
				title: 'Tischlerplatte',
				description: 'Beschreibungstext',
				img: 'https://feafashionloft.de/wp-content/uploads/2019/02/Tischlerplatte-1.jpg',
				numberofproducts: 2
			}
		];
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
