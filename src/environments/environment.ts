// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  apiUrl: 'http://localhost:8080/graphql',
  production: false,
  firebase: {
    apiKey: 'AIzaSyDcUfGECTgMUtMI4sySPKMHbITsaRPVvT0',
    authDomain: 'furniture-sale-managements.firebaseapp.com',
    databaseURL: 'https://furniture-sale-managements.firebaseio.com',
    projectId: 'furniture-sale-managements',
    storageBucket: 'furniture-sale-managements.appspot.com',
    messagingSenderId: '891263951476',
    appId: '1:891263951476:web:ff727c3ab713d4cc062721',
    measurementId: 'G-C3XFVRJB9J'
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
