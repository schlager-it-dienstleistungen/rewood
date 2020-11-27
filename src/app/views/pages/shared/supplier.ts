import { BaseDataType } from './base-data-type';

export class Supplier extends BaseDataType {
		id: string;
		name: string;
		homepage?: string;
		phone?: string;
		email?: string;
		address?: Location;
		active: boolean;
}
