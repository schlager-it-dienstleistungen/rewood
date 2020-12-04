import { BaseDataType } from './base-data-type';

export class Supplier extends BaseDataType {
		id: string;
		name: string;
		homepage?: string;
		phone?: string;
		email?: string;
		uid: string;
		fsc: boolean;
		pefc: boolean;
		address?: Location;
		active: boolean;
}
