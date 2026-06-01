import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme, toggleSidebar } from '../../features/ui/uiSlice';
import { logout } from '../../features/auth/authSlice';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'react-router-dom';

const getInitials = (name, fallback = 'US') => {
  if (!name) return fallback;
  const parts = name.trim().split(/\s+/);
  if (parts.length > 1) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, Math.min(name.length, 2)).toUpperCase();
};

const Navbar = ({ title = 'Dashboard' }) => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="h-16 sticky top-0 z-20 bg-white/80 dark:bg-dark-card/80 backdrop-blur-md border-b border-gray-200/50 dark:border-dark-border/50 px-6 flex items-center justify-between transition-colors duration-300">
      <div className="flex items-center gap-4">
        {/* Mobile menu trigger */}
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="lg:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
        >
          <MenuIcon />
        </button>
        
        <h2 className="text-xl font-bold text-gray-900 dark:text-dark-text tracking-tight capitalize">
          {title}
        </h2>
      </div>

      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <button
          onClick={() => dispatch(toggleTheme())}
          className="p-2.5 rounded-xl border border-gray-200/40 dark:border-dark-border/40 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800/80 transition-all active:scale-95"
          aria-label="Toggle Theme"
        >
          {theme === 'light' ? (
            <DarkModeOutlinedIcon sx={{ fontSize: 20 }} />
          ) : (
            <LightModeOutlinedIcon sx={{ fontSize: 20 }} />
          )}
        </button>

        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 p-1.5 pr-3 rounded-xl border border-gray-200/40 dark:border-dark-border/40 hover:bg-gray-50 dark:hover:bg-slate-800/80 transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xs shadow-sm">
              {getInitials(user?.name, 'US')}
            </div>
            <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-300 max-w-[100px] truncate">
              {user?.name || 'User'}
            </span>
            <KeyboardArrowDownIcon className="text-gray-400" sx={{ fontSize: 16 }} />
          </button>

          {dropdownOpen && (
            <>
              {/* Overlay to close click outside */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setDropdownOpen(false)}
              ></div>
              
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-card border border-gray-200/50 dark:border-dark-border/50 rounded-2xl shadow-xl py-2 z-20 animate-fade-in-down">
                <Link
                  to="/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <AccountCircleOutlinedIcon sx={{ fontSize: 18 }} className="text-gray-400" />
                  My Profile
                </Link>
                <div className="border-t border-gray-150 dark:border-dark-border/50 my-1"></div>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/10 transition-colors text-left"
                >
                  <PowerSettingsNewIcon sx={{ fontSize: 18 }} />
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
