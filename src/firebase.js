import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCo1VJHI6btVhLIIMrqGSe5e2323GMLqDs",
    authDomain: "roommessenger.firebaseapp.com",
    databaseURL: "https://roommessenger.firebaseio.com",
    projectId: "roommessenger",
    storageBucket: "roommessenger.appspot.com",
    messagingSenderId: "198187741185",
    appId: "1:198187741185:web:d44a4c719274da20a15000",
    measurementId: "G-RLXXD44KL3"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;