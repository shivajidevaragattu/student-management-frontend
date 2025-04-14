import React, { useEffect } from 'react';
import { useAuthStore } from '../stores/useAuthStore';
import Cookies from 'js-cookie';
import { createCookie, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return <>{children}</>;
};

export default ProtectedRoute;
