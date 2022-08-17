// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const userEnvironment = {
  production: false,
  baseApiUsersUrl: 'https://localhost:44358',
  usersUrl:'/api/Users',
  register: '/api/Register/signUp',
  login: '/api/Login/login'
};


export const contactEnvironment = {
  baseApiContactsUrl: 'https://localhost:44373',
   contactsUrl:'/api/Contacts',
   updateStatusByUserId:'/updatestatus/?userid=',
   status:'&status='
}

export const chatEnvironment = {
  chatsocket: 'https://localhost:44369/chatsocket',
  request: 'https://localhost:44369/request'
}

export const gameEnvironment = {
  gameSocket: 'https://localhost:44342/gamesocket'
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
