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
import { Toaster} from 'sonner';
import { CookiesProvider } from 'react-cookie';
import ProtectedRoute from './components/ProtectedRoute.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App/>
      </ProtectedRoute>
    ),
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
    path: "/addpassword/:userid/:email/:token",
    element: <AddPassword/>,
  },
]);


createRoot(document.getElementById('root')!).render(
  <>
  <Toaster richColors position='top-left'/>
  <CookiesProvider>
  <RouterProvider router={router} />
  </CookiesProvider>

</>
)

