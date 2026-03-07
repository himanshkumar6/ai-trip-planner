import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { AdminRoute } from './AdminRoute';
import { MainLayout } from '@/layouts/MainLayout';
import { ScrollToTop } from '@/components/ScrollToTop';

import { Home } from '@/pages/Home';
// ... rest of imports omitted for brevity in instruction, will be included in ReplacementContent

import { Search } from '@/pages/Search';
import { TripDetails } from '@/pages/TripDetails';
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';

import { Dashboard } from '@/pages/Dashboard';
import { Wishlist } from '@/pages/Dashboard/Wishlist';
import { Profile } from '@/pages/Dashboard/Profile';
import { GenerateTrip } from '@/pages/Dashboard/Generate';
import { MyTrips } from '@/pages/Dashboard/MyTrips';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { AdminDashboard } from '@/pages/Admin';
import { Checkout } from '@/pages/Checkout';

import { About } from '@/pages/About';
import { Careers } from '@/pages/Careers';
import { Contact } from '@/pages/Contact';
import { Destinations } from '@/pages/Destinations';
import { Tours } from '@/pages/Tours';
import { Offers } from '@/pages/Offers';
import { Terms } from '@/pages/Terms';
import { Privacy } from '@/pages/Privacy';
import { Cookies } from '@/pages/Cookies';

function RootWrapper() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootWrapper />,
    children: [
      {
        path: '/',
        element: <MainLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: 'search', element: <Search /> },
          { path: 'trips/:id', element: <TripDetails /> },
          { path: 'login', element: <Login /> },
          { path: 'register', element: <Register /> },
          { path: 'about', element: <About /> },
          { path: 'careers', element: <Careers /> },
          { path: 'contact', element: <Contact /> },
          { path: 'destinations', element: <Destinations /> },
          { path: 'tours', element: <Tours /> },
          { path: 'offers', element: <Offers /> },
          { path: 'terms', element: <Terms /> },
          { path: 'privacy', element: <Privacy /> },
          { path: 'cookies', element: <Cookies /> },
          {
            path: 'checkout/:id',
            element: (
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <Dashboard /> },
          { path: 'generate', element: <GenerateTrip /> },
          { path: 'trips', element: <MyTrips /> },
          { path: 'wishlist', element: <Wishlist /> },
          { path: 'profile', element: <Profile /> },
        ],
      },
      {
        path: 'admin',
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
