import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebarCollapse } from '../../features/ui/uiSlice';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';

const getInitials = (name, fallback = 'US') => {
  if (!name) return fallback;
  const parts = name.trim().split(/\s+/);
  if (parts.length > 1) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, Math.min(name.length, 2)).toUpperCase();
};

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const { sidebarCollapsed } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const isAdmin = user?.role === 'admin';

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <DashboardOutlinedIcon /> },
    { name: 'Employees', path: '/employees', icon: <PeopleAltOutlinedIcon /> },
    ...(isAdmin ? [{ name: 'Analytics', path: '/analytics', icon: <BarChartOutlinedIcon /> }] : []),
    { name: 'Profile', path: '/profile', icon: <AccountCircleOutlinedIcon /> },
    { name: 'Settings', path: '/settings', icon: <SettingsOutlinedIcon /> },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-30 h-screen bg-white dark:bg-dark-card border-r border-gray-200/50 dark:border-dark-border/50 transition-all duration-300 flex flex-col justify-between
        ${sidebarCollapsed ? 'w-20' : 'w-64'}
      `}
    >
      {/* Sidebar Header */}
      <div>
        <div className={`h-16 flex items-center border-b border-gray-200/50 dark:border-dark-border/50 px-4 ${
          sidebarCollapsed ? 'justify-center' : 'justify-between'
        }`}>
          {!sidebarCollapsed && (
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center shrink-0 shadow-md shadow-primary-500/20">
                <CorporateFareIcon className="text-white" sx={{ fontSize: 20 }} />
              </div>
              <span className="font-bold text-gray-900 dark:text-dark-text tracking-tight whitespace-nowrap bg-gradient-to-r from-primary-600 to-indigo-600 dark:from-primary-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Aegis Admin
              </span>
            </div>
          )}
          
          <button
            onClick={() => dispatch(toggleSidebarCollapse())}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 dark:text-gray-400 transition-colors"
          >
            {sidebarCollapsed ? <MenuIcon size={18} /> : <MenuOpenIcon size={18} />}
          </button>
        </div>

        {/* Sidebar Menu Items */}
        <nav className="p-3 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all duration-250 font-medium
                  ${isActive
                    ? 'bg-primary-50 dark:bg-primary-950/20 text-primary-600 dark:text-primary-400 font-semibold'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800/50 hover:text-gray-900 dark:hover:text-dark-text'
                  }
                `
              }
            >
              <div className="shrink-0">{item.icon}</div>
              {!sidebarCollapsed && <span className="text-sm truncate">{item.name}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Sidebar Footer / User Info */}
      <div className="p-3 border-t border-gray-200/50 dark:border-dark-border/50">
        <div className="flex items-center gap-3 p-2 rounded-xl bg-gray-50 dark:bg-dark-bg/40 overflow-hidden">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-md">
            {getInitials(user?.name, 'US')}
          </div>
          {!sidebarCollapsed && (
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 dark:text-dark-text truncate">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-gray-500 dark:text-dark-muted capitalize truncate">
                {user?.role || 'user'}
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
