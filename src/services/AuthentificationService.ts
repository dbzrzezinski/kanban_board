import { initializeApp } from "firebase/app";
import firebaseConfig from "../config/firebaseConfig";

import { getAuth } from "firebase/auth";

// init firebase
const app = initializeApp(firebaseConfig);

// init and reference firebase authentication service
export const auth = getAuth(app);
export default app;
