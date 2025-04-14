import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from '../routes/loginPage/loginPage';
import HomePage from '../routes/homePage/homePage';
import ProtectedRoute from './ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
