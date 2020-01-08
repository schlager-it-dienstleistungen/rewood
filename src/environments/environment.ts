// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	isMockEnabled: true, // You have to switch this, when your real back-end is done
	authTokenKey: 'authce9d77b308c149d5992a80073637e4d5',
	firebase: {
		apiKey: 'AIzaSyCpveFN-QVgBM0LPQYiXIjtybkr8FS9o4Q',
		authDomain: 'secondwood-82300.firebaseapp.com',
		databaseURL: 'https://secondwood-82300.firebaseio.com',
		projectId: 'secondwood-82300',
		storageBucket: 'secondwood-82300.appspot.com',
		messagingSenderId: '699444831782',
		appId: '1:699444831782:web:1ef3bf28023da1168528e7',
		measurementId: 'G-9HGLVVNBEX'
	}
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
