import { initializeApp } from 'firebase/app';
import firebaseConfig from '../config/firebaseConfig';

import { getAuth, signOut, updateProfile } from 'firebase/auth';

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

const updateUserName = async (name: string) => {
  const user = firebaseAuth.currentUser;

  const updateObject = {
    displayName: name
  };

  if (user) {
    updateProfile(user, updateObject);
  }
};

export { firebaseApp, firebaseAuth, logout, updateUserName };
