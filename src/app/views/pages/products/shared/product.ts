import { PackingUnit } from './packing-unit';

export interface Product {
	id: string;
	title: string;
	category: string;
	subcategory?: string;
	description: string;
	storage_unit?: PackingUnit;
	home_country?: string;
	storage_location?: Location;
	speciality?: string;
}
