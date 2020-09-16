import { UsersTable } from './users.table';
import { PermissionsTable } from './permissions.table';
import { RolesTable } from './roles.table';
import { Role } from '../_models/role.model';
import { User } from '../_models/user.model';
import { Permission } from '../_models/permission.model';

// Wrapper class
export class AuthDataContext {
	public static users: User[] = UsersTable.users;
	public static roles: Role[] = RolesTable.roles;
	public static permissions: Permission[] = PermissionsTable.permissions;
}
