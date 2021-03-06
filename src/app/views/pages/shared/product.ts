import { BaseDataType } from './base-data-type';
import { Dimension } from './dimension';
import { Location } from './location';
import { Picture } from './picture';

export interface Product extends BaseDataType {
	id: string;
	title: string;
	category: string;
	subcategory?: string;
	price: number;
	description: string;
	dimension: Dimension;
	home_country?: string;
	storage_location?: Location;
	speciality?: string;
	pictures?: Picture[];
	status: number;
	active: boolean;
	supplierNumber: number;
	productNumber: number;
	productReferenceNumber: string;
}
