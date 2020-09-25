export class User {
		id: string;
		authUid: string; // Firebase User-UID
		username: string;
		// password: string;
		email: string;
		roles: number[];
		categoryNotifications: string[];
		firstname: string;
		lastname: string;
		companyName: string;
		phone?: string;
		emailVerified: boolean;
		active: boolean;
}
