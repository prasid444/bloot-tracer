import firebase from '@firebase/app'

import '@firebase/auth'
import('@firebase/database');

let config = {
    apiKey: "AIzaSyAduLQi6PlE7OYD-pT4CqiSqheTkFKSXTs",
    authDomain: "blood-tracer.firebaseapp.com",
    databaseURL: "https://blood-tracer.firebaseio.com",
    projectId: "blood-tracer",
    storageBucket: "blood-tracer.appspot.com",
    messagingSenderId: "391258447053"
  
  };
  var Firebase;

    Firebase= firebase.initializeApp(config);
    console.log(Firebase);

    
// export const FirebaseDatabase;
export default Firebase;