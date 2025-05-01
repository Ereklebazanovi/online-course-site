// // src/components/ProtectedRoute.tsx
// import { Navigate } from 'react-router-dom';
// import { useAppSelector } from '../app/hooks';

// const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
//   const { uid, isEmailVerified } = useAppSelector((state) => state.auth);
//   if (!uid || !isEmailVerified) {
//     return <Navigate to="/login" />;
//   }
//   return children;
// };

// export default ProtectedRoute;


// src/components/PrivateRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute: React.FC = () => {
  const { user } = useAuth();

  // If user is still loading, you could return a spinner here instead.
  if (user === undefined) {
    return <div>Loading...</div>;
  }

  // If not logged in, redirect to login page.
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
