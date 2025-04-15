import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from '../routes/loginPage/loginPage';
import SignUp from '../routes/loginPage/signupPage';
import HomePage from '../routes/homePage/homePage';
import ProtectedRoute from './ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div className="bg-white p-2 rounded-lg shadow-lg">
        Home Page on the way till then play with login page ()=&gt;route to
        login page :)
      </div>
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/dashboard',
    element: <div>Dashboard Page</div>,
  },
]);

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
