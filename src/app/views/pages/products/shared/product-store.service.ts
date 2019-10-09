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

	searchProducts(searchInput: SearchProducts): Product[] {
		let products: Product [] = this.getProducts();

		if (searchInput.title) {
			products = products.filter((product) => product.title.indexOf(searchInput.title) !== -1);
		}
		if (searchInput.category) {
			products = products.filter((product) => product.category.indexOf(searchInput.category) !== -1);
		}
		if (searchInput.price_from) {
			products = products.filter((product) => product.price >= searchInput.price_from);
		}
		if (searchInput.price_to) {
			products = products.filter((product) => product.price <= searchInput.price_to);
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
				title: 'Spanplatte zu kurz',
				category: 'Spanplatte',
				subcategory: '',
				price: 10500,
				description: 'um 2 Zentimeter zu kurz',
				picture: 'https://media.bahag.com/assets/resp_product/10/75/1075985_22086959.jpg'
			},
			{
				id: '2',
				title: 'Spanplatte zu lang',
				category: 'Spanplatte',
				subcategory: '',
				price: 1500.55,
				description: '2,53 statt 2,50 Meter',
				picture: 'https://media.bahag.com/assets/resp_product/10/75/1075985_22086959.jpg'
			},
			{
				id: '3',
				title: 'OSB falsch furniert',
				category: 'OSB',
				price: 25000,
				description: 'mit Buche statt Eiche furniert',
				picture: 'https://balkotrade.com/media/catalog/product/cache/4/image/9df78eab33525d08d6e5fb8d27136e95/e/g/egger_osb-3_6_4.jpg'
			},
			{
				id: '4',
				title: 'Sperrholz',
				category: 'Sperrholz',
				price: 9999.99,
				description: 'Sperrholz mit leichter Dunkelfärbung',
				picture: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Spruce_plywood.JPG'
			},
			{
				id: '5',
				title: '',
				category: 'Tischlerplatte',
				price: 27500,
				description: 'Tischlerplatte mit Ästen',
				picture: 'https://feafashionloft.de/wp-content/uploads/2019/02/Tischlerplatte-1.jpg'
			},
			{
				id: '6',
				title: 'Birkensperrholz',
				category: 'Sperrholz',
				price: 10000,
				description: 'mit Klöpfer',
				picture: 'https://i.ebayimg.com/images/g/gs8AAOSwVaVZy~m2/s-l300.jpg'
			},
			{
				id: '7',
				title: '',
				category: 'HDF',
				price: 20000,
				description: 'gemischte Laminierungen',
				picture: 'https://5.imimg.com/data5/SL/YW/BT/SELLER-82461688/prelaminated-mdf-board-500x500.jpg'
			}
		];
	}

	getCategories(): Category[] {
		return [
			{
				title: 'Spanplatte',
				description: 'Beschreibungstext',
				img: 'https://media.bahag.com/assets/resp_product/10/75/1075985_22086959.jpg'
			},
			{
				title: 'OSB',
				description: 'Beschreibungstext',
				img: 'https://balkotrade.com/media/catalog/product/cache/4/image/9df78eab33525d08d6e5fb8d27136e95/e/g/egger_osb-3_6_4.jpg'
			},
			{
				title: 'MDF',
				description: 'Beschreibungstext',
				img: 'https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjBn_SGsY_lAhUDYVAKHXn0C_' +
					'wQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.totemtimber.co.uk%2Fproduct%2Fsheet-materials%2Fmdf%2Fmedium-density-' +
					'fibreboard-mdf-3050x1220x25mm%2F&psig=AOvVaw02dCW7wGTFienXZjayM6ja&ust=1570717533728835'
			},
			{
				title: 'HDF',
				description: 'Beschreibungstext',
				img: 'https://5.imimg.com/data5/SL/YW/BT/SELLER-82461688/prelaminated-mdf-board-500x500.jpg'
			},
			{
				title: 'Sperrholz',
				description: 'Beschreibungstext',
				img: 'https://i.ebayimg.com/images/g/gs8AAOSwVaVZy~m2/s-l300.jpg'
			},
			{
				title: 'Tischlerplatte',
				description: 'Beschreibungstext',
				img: 'https://feafashionloft.de/wp-content/uploads/2019/02/Tischlerplatte-1.jpg'
			}
		];
	}
}
