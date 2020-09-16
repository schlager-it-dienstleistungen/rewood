import { Permission } from '../_models/permission.model';

export class PermissionsTable {
	public static permissions: Permission[] = [
				{
						id: 1,
						name: 'accessToHomeModule',
						level: 1,
						title: 'Home Module'
				},
				{
						id: 2,
						name: 'accessToProductsModule',
						level: 1,
						title: 'Products Module'
				}
		];
}
