import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './component/Home.jsx';
import ErrorPage from './component/ErrorPage.jsx';
import Login from './component/Login.jsx';
import Register from './component/Register.jsx';
import RegisterRBs from './component/RegisterRBs.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/registerRBs',
        element: <RegisterRBs />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
