import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import firebaseConfig from "../config/config";

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export {database};
