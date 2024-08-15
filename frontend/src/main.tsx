import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Signup from './pages/signup.tsx';
import { Verify } from './pages/Verify.tsx';
import AddPassword from './pages/AddPassword.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/signup",
    element: <Signup/>,
  },
  {
    path: "/verify/:id/:token",
    element: <Verify/>,
  },
  {
    path: "/addpassword/:userid/:email",
    element: <AddPassword/>,
  },
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
<RouterProvider router={router} />
  </StrictMode>,
)
