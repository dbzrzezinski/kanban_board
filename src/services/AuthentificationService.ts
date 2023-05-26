import { initializeApp } from "firebase/app";
import firebaseConfig from "../config/firebaseConfig";
console.log(firebaseConfig);
//import { getFirestore, collection, getDocs } from "firebase/firestore";

import { getAuth } from "firebase/auth";

// init firebase
const app = initializeApp(firebaseConfig);

// init and reference firebase authentication service
export const auth = getAuth(app);
export default app;
