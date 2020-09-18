import { Role } from '../_models/role.model';

export class RolesTable {
	public static roles: Role[] = [
				{
						id: 1,
						title: 'ADMIN',
						isCoreRole: true,
						permissions: [1, 2]
				},
				{
						id: 2,
						title: 'SUPPLIER',
						isCoreRole: false,
						permissions: [1]
				},
				{
						id: 3,
						title: 'CUSTOMER',
						isCoreRole: false,
						permissions: [2]
				},
				{
						id: 4,
						title: 'GUEST',
						isCoreRole: false,
						permissions: []
				}
		];
}
