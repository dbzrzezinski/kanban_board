import { initializeApp } from 'firebase/app';
import firebaseConfig from '../config/firebaseConfig';

import { getAuth, signOut } from 'firebase/auth';

// init firebase
const firebaseApp = initializeApp(firebaseConfig);

// init and reference firebase authentication service
const firebaseAuth = getAuth(firebaseApp);

const logout = async () => {
  try {
    return await signOut(firebaseAuth);
  } catch (error) {
    alert(error);
  }
};

export { firebaseApp, firebaseAuth, logout };
