import { Injectable } from '@angular/core';
import { Category } from './category';

@Injectable({
	providedIn: 'root'
})
export class CategoryFactoryService {

	constructor() { }

	static getCategories(): Category[] {
		return [
			{
				title: 'Spanplatte',
				description: 'Beschreibungstext',
				img: './assets/rewood/categories/Spanplatte_374_374.jpg'
			},
			{
				title: 'OSB',
				description: 'Beschreibungstext',
				img: './assets/rewood/categories/OSB_374_374.jpg'
			},
			{
				title: 'MDF',
				description: 'Beschreibungstext',
				img: './assets/rewood/categories/MDF_374_374.jpg'
			},
			{
				title: 'HDF',
				description: 'Beschreibungstext',
				img: './assets/rewood/categories/HDF_374_374.jpg'
			},
			{
				title: 'Sperrholz',
				description: 'Beschreibungstext',
				img: './assets/rewood/categories/Sperrholz_374_374.jpg'
			},
			{
				title: 'Tischlerplatte',
				description: 'Beschreibungstext',
				img: './assets/rewood/categories/Tischlerplatte_374_374.jpg'
			}
		];
	}
}
