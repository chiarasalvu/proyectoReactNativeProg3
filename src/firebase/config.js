import app from 'firebase/app';
import firebase from 'firebase';

//Aca va la constante de la config de firebase.
const firebaseConfig = {
    apiKey: "AIzaSyDWZsXvMDbkx9sdb_x4x3f7w2dR8iKgnco",
    authDomain: "proyectoreactnativeprog3.firebaseapp.com",
    projectId: "proyectoreactnativeprog3",
    storageBucket: "proyectoreactnativeprog3.appspot.com",
    messagingSenderId: "599070683804",
    appId: "1:599070683804:web:4b3c2ae514fd9500637359"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore()