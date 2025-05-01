// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { uid, isEmailVerified } = useAppSelector((state) => state.auth);
  if (!uid || !isEmailVerified) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;