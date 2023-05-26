// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.8.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.8.2/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
    apiKey: 'AIzaSyCAXligEQ4j0_XwC4Xp6jTtcf0zBvreZHA',
    authDomain: 'profitley.firebaseapp.com',
    databaseURL: 'https://profitley-default-rtdb.firebaseio.com',
    projectId: 'profitley',
    storageBucket: 'profitley.appspot.com',
    messagingSenderId: '607534301528',
    appId: '1:607534301528:web:42fe87b7362d788a47252d',
    measurementId: 'G-JP5P44D84L'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
messaging.usePublicVapidKey(
    'BOsSzxxszgFG3440wTpb6cc3WSovXUHDD0xFt1qZnG2iV3HbUYNZYVtdozxM0zbvdFzfVkdoehKnzIqj14g6Cno'
);
