import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';
import LoadingSkeleton from '../components/common/LoadingSkeleton';

// Layouts
import AdminLayout from '../layouts/AdminLayout';
import AuthLayout from '../layouts/AuthLayout';

// Lazy load Pages (Checklist Section 3 & 12 - Code Splitting)
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Employees = lazy(() => import('../pages/Employees'));
const Analytics = lazy(() => import('../pages/Analytics'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));

const SuspenseLayout = ({ children }) => (
  <Suspense
    fallback={
      <div className="p-8">
        <LoadingSkeleton />
      </div>
    }
  >
    {children}
  </Suspense>
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth / Public Routes */}
      <Route element={<SuspenseLayout><AuthLayout /></SuspenseLayout>}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Admin / Private Routes */}
      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<SuspenseLayout><Dashboard /></SuspenseLayout>} />
        <Route path="/employees" element={<SuspenseLayout><Employees /></SuspenseLayout>} />
        
        {/* Analytics Restricted to Admin Role */}
        <Route
          path="/analytics"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <SuspenseLayout><Analytics /></SuspenseLayout>
            </ProtectedRoute>
          }
        />
        
        <Route path="/profile" element={<SuspenseLayout><Profile /></SuspenseLayout>} />
        <Route path="/settings" element={<SuspenseLayout><Settings /></SuspenseLayout>} />
        
        {/* Redirect from root to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Route>

      {/* Catch-all redirect to dashboard */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
