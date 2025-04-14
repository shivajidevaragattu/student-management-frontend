import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../routes/loginPage/loginPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
]);

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
