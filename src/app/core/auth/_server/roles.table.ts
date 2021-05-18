import { Role } from '../_models/role.model';

enum RolesEnum {
	ADMIN = 1,
	SUPPLIER = 2,
	CUSTOMER = 3,
	GUEST = 4
}
export class RolesTable {
	public static RolesEnum = RolesEnum;

	public static isRoleADMIN(roles: number[]) {
		return roles.indexOf(RolesTable.RolesEnum.ADMIN) >= 0;
	}

	public static isRoleSUPPLIER(roles: number[]) {
		return roles.indexOf(RolesTable.RolesEnum.SUPPLIER) >= 0;
	}

	public static isRoleCUSTOMER(roles: number[]) {
		return roles.indexOf(RolesTable.RolesEnum.CUSTOMER) >= 0;
	}

	public static roles: Role[] = [
				{
						id: 1,
						title: 'ADMIN',
						isCoreRole: true,
						permissions: [10000, 10010, 10020, 20000, 20010, 20020, 30000, 30010, 30020, 40000, 40010, 40020, 40030, 40040, 50000,
							 50010, 50020, 60000, 60010, 60020, 60030, 60040, 60050, 60060]
				},
				{
						id: 2,
						title: 'SUPPLIER',
						isCoreRole: false,
						permissions: [10000, 10010, 10020, 20000, 20010, 20020, 30000, 30010, 30020, 40010, 50000, 50010, 50020, 60010, 60030, 60060]
				},
				{
						id: 3,
						title: 'CUSTOMER',
						isCoreRole: false,
						permissions: [10000, 10010, 10020, 20000, 20010, 20020, 30000, 30010, 30020, 60010, 60030, 60060]
				},
				{
						id: 4,
						title: 'GUEST',
						isCoreRole: false,
						permissions: [10000, 10010, 10020, 20000, 20010, 20020, 30000, 30010, 30020]
				}
		];
}
