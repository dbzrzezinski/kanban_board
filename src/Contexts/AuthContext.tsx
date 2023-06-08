import React, { useEffect, useState, ReactNode, createContext } from 'react';
import { firebaseAuth } from '../services/AuthentificationService';
import { User } from 'firebase/auth';

type AuthContextProviderProps = {
  children?: ReactNode;
};

type CreateContextProps = {
  user: User | null;
};

const AuthContext = createContext<CreateContextProps>({ user: null });

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        setPending(false);
      } else {
        setPending(false);
      }
    });
  }, []);

  if (pending) {
    return <>Loading...</>;
  }

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

export { AuthContextProvider, AuthContext };
