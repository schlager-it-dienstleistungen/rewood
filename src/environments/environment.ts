// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	appVersion: 'v01_20201209_02',
	isMockEnabled: false, // You have to switch this, when your real back-end is done
	authTokenKey: 'authce9d77b308c149d5992a80073637e4d5', // User-UID
	firebase: {
		apiKey: 'AIzaSyAqmWi9KjWwRaGYjmRiDUp5UReGuAyt3Ro',
		authDomain: 'rewood-a7ef8.firebaseapp.com',
		databaseURL: 'https://rewood-a7ef8.firebaseio.com',
		projectId: 'rewood-a7ef8',
		storageBucket: 'rewood-a7ef8.appspot.com',
		messagingSenderId: '1043942842507',
		appId: '1:1043942842507:web:e66687677c51097f8ff48e',
		measurementId: 'G-HB50Q1Z005'
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
