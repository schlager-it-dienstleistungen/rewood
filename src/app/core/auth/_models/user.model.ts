import { BaseModel } from '../../_base/crud';
import { Address } from './address.model';
import { SocialNetworks } from './social-networks.model';

export class User extends BaseModel {
		id: number;
		authUid: string; // Firebase User-UID
		username: string;
		password: string;
		email: string;
		accessToken: string;
		refreshToken: string;
		roles: number[];
		pic: string;
		firstname: string;
		lastname: string;
		occupation: string;
		companyName: string;
		phone: string;
		emailVerified: boolean;
		address: Address;
		socialNetworks: SocialNetworks;

		clear(): void {
				this.id = undefined;
				this.authUid = '';
				this.username = '';
				this.password = '';
				this.email = '';
				this.roles = [];
				this.firstname = '';
				this.lastname = '';
				this.accessToken = 'access-token-' + Math.random();
				this.refreshToken = 'access-token-' + Math.random();
				this.pic = './assets/media/users/default.jpg';
				this.occupation = '';
				this.companyName = '';
				this.phone = '';
				this.address = new Address();
				this.address.clear();
				this.emailVerified = false;
				this.socialNetworks = new SocialNetworks();
				this.socialNetworks.clear();
		}
}
