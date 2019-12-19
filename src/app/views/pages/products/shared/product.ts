import { PackingUnit } from './packing-unit';

export interface Product {
	id: string;
	title: string;
	category: string;
	subcategory?: string;
	measure?: string; // Maß
	amount?: number; // Menge
	price: number;
	description: string;
	storage_unit?: PackingUnit;
	home_country?: string;
	storage_location?: Location;
	speciality?: string;
	picture?: string;
	status: number;
}
