// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDfx9wkAVHI8FUraXtT1OJG2py8j6EZa4s",
    authDomain: "flagship-armada-jawilson.firebaseapp.com",
    projectId: "flagship-armada-jawilson",
    storageBucket: "flagship-armada-jawilson.appspot.com",
    messagingSenderId: "59594821233",
    appId: "1:59594821233:web:f88c4ff26a8a93c360d5d0",
    measurementId: "G-KR1YGV6YM1"
  }
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
