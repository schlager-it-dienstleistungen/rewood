import { Permission } from '../_models/permission.model';

export class PermissionsTable {
	public static permissions: Permission[] = [
			{id: 10000, name: 'Home', level: 1, title: 'Home'},
			{id: 10010, name: 'News', level: 1, title: 'Home'},
			{id: 10020, name: 'Credo', level: 1, title: 'Home'},
			{id: 20000, name: 'About', level: 1, title: 'General'},
			{id: 20010, name: 'Team', level: 1, title: 'General'},
			{id: 20020, name: 'Contact', level: 1, title: 'General'},
			{id: 30000, name: 'Categories', level: 1, title: 'Products'},
			{id: 30010, name: 'ProductList', level: 1, title: 'Products'},
			{id: 30020, name: 'ProductDetail', level: 1, title: 'Products'},
			{id: 40000, name: 'SupplierList', level: 1, title: 'Admin'},
			{id: 40010, name: 'SupplierDetail', level: 1, title: 'Admin'},
			{id: 40020, name: 'EditSupplier', level: 1, title: 'Admin'},
			{id: 40030, name: 'NewSupplier', level: 1, title: 'Admin'},
			{id: 40040, name: 'DeleteSupplier', level: 1, title: 'Admin'},
			{id: 50000, name: 'NewProduct', level: 1, title: 'Admin'},
			{id: 50010, name: 'EditProduct', level: 1, title: 'Admin'},
			{id: 50020, name: 'DeleteProduct', level: 1, title: 'Admin'},
			{id: 60000, name: 'Userlist', level: 1, title: 'Admin'},
			{id: 60010, name: 'Userdetail', level: 1, title: 'Admin'},
			{id: 60020, name: 'EditUser', level: 1, title: 'Admin'},
			{id: 60030, name: 'EditUserNotifications', level: 1, title: 'Admin'},
			{id: 60040, name: 'NewUser', level: 1, title: 'Admin'},
			{id: 60050, name: 'DeleteUser', level: 1, title: 'Admin'},
			{id: 60060, name: 'ResetPassword', level: 1, title: 'Admin'},
		];
}
