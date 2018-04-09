// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase : {
    apiKey: "AIzaSyCAFGV7Ja0X7fNZzqJzV1Bfki55lHcBheI",
    authDomain: "spaquerys.firebaseapp.com",
    databaseURL: "https://spaquerys.firebaseio.com",
    projectId: "spaquerys",
    storageBucket: "spaquerys.appspot.com",
    messagingSenderId: "95655825057"
  }
};
