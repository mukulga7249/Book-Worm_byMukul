import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const user = localStorage.getItem('userType') || '{}';
  const isUserLoggedIn = user  
  const userHasRequiredRole = allowedRoles.includes(user);

  if (!isUserLoggedIn) {
    // User not logged in, redirect to sign-in page
    return <Navigate to="/" />;
  } else if (!userHasRequiredRole) {
    // User logged in but doesn't have the required role, redirect to landing page or a "Not Authorized" page
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
