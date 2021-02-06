import { BaseDataType } from './base-data-type';

export class User extends BaseDataType {
		id: string;
		authUid: string; // Firebase User-UID
		username: string;
		password: string;
		email: string;
		roles: number[];
		categoryNotifications: string[];
		firstname: string;
		lastname: string;
		company: string;
		phone: string;
		emailVerified: boolean;
		active: boolean;
		supplierNumber: number;
}
