// src/components/PrivateRoute.tsx
import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user } = useAuth();

  if (user === undefined) {
    // still loading auth
    return <div className="p-6 text-center">Loading...</div>;
  }

  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
