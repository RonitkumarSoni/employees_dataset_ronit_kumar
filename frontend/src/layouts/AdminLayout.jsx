import React, { useEffect } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import { setSidebarOpen } from '../features/ui/uiSlice';

const AdminLayout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { theme, sidebarOpen, sidebarCollapsed } = useSelector((state) => state.ui);
  const { isAuthenticated, token } = useSelector((state) => state.auth);

  // Sync dark class on document element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Close sidebar on mobile navigation
  useEffect(() => {
    dispatch(setSidebarOpen(false));
  }, [location.pathname, dispatch]);

  if (!isAuthenticated || !token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Generate dynamic page title based on path
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/dashboard')) return 'Dashboard Overview';
    if (path.includes('/employees')) return 'Employee Directory';
    if (path.includes('/analytics')) return 'Analytics Reports';
    if (path.includes('/profile')) return 'My Profile';
    if (path.includes('/settings')) return 'System Settings';
    return 'Admin Control Panel';
  };

  return (
    <div className="h-screen bg-slate-50 dark:bg-dark-bg text-gray-900 dark:text-dark-text transition-colors duration-300 flex overflow-hidden">
      {/* Sidebar Navigation */}
      <div className={`hidden lg:block shrink-0 ${sidebarCollapsed ? 'w-20' : 'w-64'} transition-all duration-300`}>
        <Sidebar />
      </div>

      {/* Mobile Drawer Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => dispatch(setSidebarOpen(false))}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 bottom-0 left-0 z-50 lg:hidden transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <Sidebar />
      </div>

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <Navbar title={getPageTitle()} />
        <main className="flex-1 overflow-y-auto p-8 sm:p-10 lg:p-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
