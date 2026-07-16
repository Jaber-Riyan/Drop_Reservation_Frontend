import { createBrowserRouter } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { CreateDropPage } from '../pages/CreateDropPage';
import { ReservationPage } from '../pages/ReservationPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { Navbar } from '../components/Navbar';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Navbar />
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/drop/create',
    element: (
      <ProtectedRoute>
        <Navbar />
        <CreateDropPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/reservation',
    element: (
      <ProtectedRoute>
        <Navbar />
        <ReservationPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);