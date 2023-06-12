import { getDatabase, set, ref } from 'firebase/database';
import { firebaseApp, firebaseAuth } from './AuthentificationService';

// Types
import { User } from 'firebase/auth';
import { UpdateUserObject } from './../Types/UserService';

const updateUser = async (updateObject: Partial<UpdateUserObject>) => {
  const db = getDatabase(firebaseApp);
  const { uid } = firebaseAuth.currentUser as User;

  const allowUpdateFields = ['uuid', 'email', 'displayName', 'photoUrl', 'lastLogin', 'banned'];

  // check if we just have allowed fields
  const validateFields = Object.keys(updateObject).filter((key) => allowUpdateFields.includes(key));

  // write to firebase database
  if (validateFields) {
    set(ref(db, `users/${uid}`), updateObject);
  }
};

export { updateUser };
