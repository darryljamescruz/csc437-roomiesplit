import React, { JSX } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * RequireAuth Component
 * Checks if the user is authenticated by verifying the existence of a token.
 * If not authenticated, redirects to the login page.
 */
export default function RequireAuth({ children }: { children: JSX.Element }): JSX.Element {
  const token = localStorage.getItem('token');
  const location = useLocation();

  console.log('RequireAuth: token is', token); // Debug line


  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}