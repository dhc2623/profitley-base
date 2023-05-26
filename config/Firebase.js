import firebase from 'firebase/app';
require('firebase/auth');
require('firebase/database');
require('firebase/messaging');

//For developement
// export const FIREBASECONFIG = {
//     apiKey: "AIzaSyC9Jx4MH1GnAUiP8gWsc3bsRFJsmaCbNIQ",
//     authDomain: "snapvat-de93b.firebaseapp.com",
//     databaseURL: "https://snapvat-de93b.firebaseio.com",
//     projectId: "snapvat-de93b",
//     storageBucket: "snapvat-de93b.appspot.com",
//     messagingSenderId: "694351555004",
//     appId: "1:694351555004:web:dc88fed3888ee87bc6a3b9",
//     measurementId: "G-8ZVQ0G3BYG"
// };

export const FIREBASECONFIG = {
    apiKey: 'AIzaSyCAXligEQ4j0_XwC4Xp6jTtcf0zBvreZHA',
    authDomain: 'profitley.firebaseapp.com',
    databaseURL: 'https://profitley-default-rtdb.firebaseio.com',
    projectId: 'profitley',
    storageBucket: 'profitley.appspot.com',
    messagingSenderId: '607534301528',
    appId: '1:607534301528:web:42fe87b7362d788a47252d',
    measurementId: 'G-JP5P44D84L'
};

// export default !firebase.apps.length ? firebase.initializeApp(FIREBASECONFIG) : firebase.app();

let initializeApp;
if (!firebase.apps.length) {
  initializeApp = firebase.initializeApp(FIREBASECONFIG)
  firebase.auth().signInWithEmailAndPassword('mohammed.poolwala@systematixindia.com', '123456789')
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // console.log('user', user.uid)
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log('errorCode', errorCode)
      console.log('errorMessage', errorMessage)
    });

} else {
  initializeApp = firebase.app()
}

export default initializeApp; 