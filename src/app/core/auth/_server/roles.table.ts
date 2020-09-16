import { Role } from '../_models/role.model';

export class RolesTable {
	public static roles: Role[] = [
				{
						id: 1,
						title: 'admin',
						isCoreRole: true,
						permissions: [1, 2]
				},
				{
						id: 2,
						title: 'supplier',
						isCoreRole: false,
						permissions: [1]
				},
				{
						id: 3,
						title: 'customer',
						isCoreRole: false,
						permissions: [2]
				},
				{
						id: 4,
						title: 'guest',
						isCoreRole: false,
						permissions: []
				}
		];
}
