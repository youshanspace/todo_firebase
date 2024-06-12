import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import firebaseConfig from '../config/config';

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const user = auth.currentUser;

export { database, provider, auth, user };
