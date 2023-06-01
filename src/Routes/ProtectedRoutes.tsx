import React, { useState, useEffect } from "react";

import { Route, Navigate, RouteProps } from "react-router-dom";
import { auth } from "../services/AuthentificationService";

type ProtectedRouteProps = {
  children: JSX.Element;
} & RouteProps;

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  if (!isAuthenticated) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
