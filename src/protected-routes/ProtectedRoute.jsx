import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const role = sessionStorage.getItem('userRole');

  return allowedRoles.includes(role) ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
