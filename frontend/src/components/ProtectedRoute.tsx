
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [cookies] = useCookies(['Authorization']);
  const location = useLocation();

  if (!cookies.Authorization) {
    return <Navigate to="/signup" state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
