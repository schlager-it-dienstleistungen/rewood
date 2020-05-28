import { PackingUnit } from './packing-unit';
import { Location } from './location';
import { Picture } from './picture';

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
	pictures?: Picture[];
	status: number;
}
