import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user.model';
import { Permission } from '../_models/permission.model';
import { Role } from '../_models/role.model';
import { catchError, map } from 'rxjs/operators';
import { QueryParamsModel, QueryResultsModel } from '../../_base/crud';
import { environment } from '../../../../environments/environment';

import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthDataContext } from '../_server/auth.data-context';

const API_USERS_URL = 'api/users';
const API_PERMISSION_URL = 'api/permissions';
const API_ROLES_URL = 'api/roles';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	userData: any;		// Save logged in user data

	constructor(
		private http: HttpClient,
		private afs: AngularFirestore,		// Inject Firestore Service
		private afAuth: AngularFireAuth		// Inject Firebase auth Service
	) {
		/* Saving user data in localstorage when
		logged in and setting up null when logged out */
		// https://www.positronx.io/full-angular-7-firebase-authentication-system/
		this.afAuth.authState.subscribe(authUser => {
			if (authUser) {
				this.findUserByAuthUid(authUser.uid).subscribe({
					next: (dbUser: User) => {
						localStorage.setItem('user', JSON.stringify(dbUser));
						JSON.parse(localStorage.getItem('user'));
					}
				});
			} else {
				localStorage.removeItem('user');
			}
		});
	}

	// Authentication/Authorization
	login(email: string, password: string): Promise<any> {
		return this.afAuth.auth.signInWithEmailAndPassword(email, password);
	}

	logout(): Promise<any> {
		return this.afAuth.auth.signOut();
	}

	getUserByToken(): Observable<User> {
		return this.findUserByAuthUid(localStorage.getItem(environment.authTokenKey));
	}

	register(email: string, password: string): Promise<any> {
		return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
// .then((result) => {
				/* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
				// this.SendVerificationMail();
				// this.SetUserData(result.user);

// With Task: Authentication: Store additional Userdata
/*map((res: User) => {
					return res;
				})*/

/*				return result.user;
			}).catch((error) => {
				console.error(error.message);
				return null;
			});*/
	}

	/*
   * Submit forgot password request
   *
   * @param {string} email
   * @returns {Observable<any>}
   */
	public requestPassword(email: string): Observable<any> {
		return this.http.get(API_USERS_URL + '/forgot?=' + email)
			.pipe(catchError(this.handleError('forgot-password', []))
			);
	}

	getAllUsers(): Observable<User[]> {
		return this.afs.collection<User>('users').valueChanges();
	}

	getUserById(userId: number): Observable<User> {
		return this.afs.collection<Role>('users').doc<User>('' + userId).valueChanges();
	}

	findUserByAuthUid(authUid: string): Observable<User> {
		return this.afs.collection<User>('users',
			ref => ref.where('authUid', '==', authUid).limit(1))
			.valueChanges()
			.pipe(
				map(users => users[0])
			);
	}


	// DELETE => delete the user from the server
	deleteUser(userId: number) {
		const url = `${API_USERS_URL}/${userId}`;
		return this.http.delete(url);
	}

	// UPDATE => PUT: update the user on the server
	// tslint:disable-next-line
  updateUser(_user: User): Observable<any> {
		let httpHeaders = new HttpHeaders();
		httpHeaders = httpHeaders.set('Content-Type', 'application/json');
		return this.http.put(API_USERS_URL, _user, {headers: httpHeaders});
	}

	// CREATE =>  POST: add a new user to the server
	createUser(user: User): Observable<User> {
		let httpHeaders = new HttpHeaders();
		httpHeaders = httpHeaders.set('Content-Type', 'application/json');
		return this.http.post<User>(API_USERS_URL, user, {headers: httpHeaders});
	}

	// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
	// items => filtered/sorted result
	findUsers(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
		let httpHeaders = new HttpHeaders();
		httpHeaders = httpHeaders.set('Content-Type', 'application/json');
		return this.http.post<QueryResultsModel>(API_USERS_URL + '/findUsers', queryParams, {headers: httpHeaders});
	}

	// Permission
	getAllPermissions(): Observable<Permission[]> {
		return of(AuthDataContext.permissions);
	}

	getRolePermissions(roleId: number): Observable<Permission[]> {
		const oneRole = AuthDataContext.roles.find(role => role.id === roleId);
		return of(AuthDataContext.permissions.filter(permission => oneRole.permissions.indexOf(permission.id) > 0));
	}

	// Roles
	getAllRoles(): Observable<Role[]> {
		return of(AuthDataContext.roles);
	}

	getRoleById(roleId: number): Observable<Role> {
		return of(AuthDataContext.roles.find(role => role.id === roleId));
	}

	// CREATE =>  POST: add a new role to the server
	createRole(role: Role): Observable<Role> {
		// Note: Add headers if needed (tokens/bearer)
		let httpHeaders = new HttpHeaders();
		httpHeaders = httpHeaders.set('Content-Type', 'application/json');
		return this.http.post<Role>(API_ROLES_URL, role, {headers: httpHeaders});
	}

	// UPDATE => PUT: update the role on the server
	updateRole(role: Role): Observable<any> {
		let httpHeaders = new HttpHeaders();
		httpHeaders = httpHeaders.set('Content-Type', 'application/json');
		return this.http.put(API_ROLES_URL, role, {headers: httpHeaders});
	}

	// DELETE => delete the role from the server
	deleteRole(roleId: number): Observable<Role> {
		const url = `${API_ROLES_URL}/${roleId}`;
		return this.http.delete<Role>(url);
	}

	// Check Role Before deletion
	isRoleAssignedToUsers(roleId: number): Observable<boolean> {
		return this.http.get<boolean>(API_ROLES_URL + '/checkIsRollAssignedToUser?roleId=' + roleId);
	}

	findRoles(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
		// This code imitates server calls
		let httpHeaders = new HttpHeaders();
		httpHeaders = httpHeaders.set('Content-Type', 'application/json');
		return this.http.post<QueryResultsModel>(API_ROLES_URL + '/findRoles', queryParams, {headers: httpHeaders});
	}

	/*
   * Handle Http operation that failed.
   * Let the app continue.
    *
  * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
	private handleError<T>(operation = 'operation', result?: any) {
		return (error: any): Observable<any> => {
			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// Let the app keep running by returning an empty result.
			return of(result);
		};
	}
}
