import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signup from './Components/Signup.jsx';
import Login from './Components/Login.jsx';
import Dashboard from './Components/Dashboard.jsx';
import UpdatePage from './Components/UpdatePage.jsx';
import PageNotFound from './Components/PageNotFound.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx';
import ForgetPassword from './Components/ForgetPassword.jsx';
import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <PageNotFound />,
    children: [
      { index: true, element: <Login /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
      { path: 'resetPassword', element: <ForgetPassword /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'dashboard', element: <Dashboard /> },
          { path: 'updateUser', element: <UpdatePage /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
