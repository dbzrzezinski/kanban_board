import React, { useState, useEffect } from 'react';

import { Navigate, RouteProps } from 'react-router-dom';
import { firebaseAuth } from '../services/AuthentificationService';

type ProtectedRouteProps = {
  children: JSX.Element;
} & RouteProps;

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  if (!isAuthenticated) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
