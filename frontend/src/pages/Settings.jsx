import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme, toggleSidebarCollapse } from '../features/ui/uiSlice';
import SEO from '../components/common/SEO';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SidebarIcon from '@mui/icons-material/ViewSidebarOutlined';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';

const Settings = () => {
  const dispatch = useDispatch();
  const { theme, sidebarCollapsed } = useSelector((state) => state.ui);

  return (
    <>
      <SEO
        title="Settings"
        description="Configure Aegis Employee Analytics dashboard UI theme and sidebar preferences."
      />
      <div className="space-y-6 max-w-7xl mx-auto">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-dark-text tracking-tight">
            System Settings
          </h1>
          <p className="text-sm text-gray-500 dark:text-dark-muted">
            Configure UI themes, sidebar modes, and localized user preferences.
          </p>
        </div>

        <div className="bg-white dark:bg-dark-card border border-gray-200/50 dark:border-dark-border/50 rounded-2xl p-6 shadow-md space-y-6">
          {/* Section: UI Theme Mode */}
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-dark-text mb-4 flex items-center gap-2">
              <SettingsSuggestIcon className="text-primary-500" sx={{ fontSize: 20 }} />
              Visual Interface Theme
            </h3>
            
            <p className="text-xs text-gray-500 dark:text-dark-muted mb-4">
              Toggle the system visual environment between crisp light colors and a high-contrast dark palette.
            </p>

            <div className="grid grid-cols-2 gap-4 max-w-md">
              {/* Light Mode Option */}
              <button
                onClick={() => theme !== 'light' && dispatch(toggleTheme())}
                className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-left
                  ${
                    theme === 'light'
                      ? 'border-primary-500 bg-primary-50/20 text-primary-600 font-bold ring-2 ring-primary-500/20'
                      : 'border-gray-200 dark:border-dark-border text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800/40'
                  }
                `}
              >
                <LightModeIcon sx={{ fontSize: 20 }} />
                <div>
                  <p className="text-sm">Light Mode</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">Standard system colors</p>
                </div>
              </button>

              {/* Dark Mode Option */}
              <button
                onClick={() => theme !== 'dark' && dispatch(toggleTheme())}
                className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-left
                  ${
                    theme === 'dark'
                      ? 'border-primary-500 bg-primary-950/20 text-primary-400 font-bold ring-2 ring-primary-500/20'
                      : 'border-gray-200 dark:border-dark-border text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800/40'
                  }
                `}
              >
                <DarkModeIcon sx={{ fontSize: 20 }} />
                <div>
                  <p className="text-sm">Dark Mode</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">High-contrast dark environment</p>
                </div>
              </button>
            </div>
          </div>

          <div className="border-t border-gray-150 dark:border-dark-border/50 my-6"></div>

          {/* Section: Sidebar Collapsed Preference */}
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-dark-text mb-4 flex items-center gap-2">
              <SidebarIcon className="text-primary-500" sx={{ fontSize: 20 }} />
              Sidebar Preference
            </h3>
            
            <p className="text-xs text-gray-500 dark:text-dark-muted mb-4">
              Toggle the default workspace sidebar setting between expanded labels or compact icon view.
            </p>

            <button
              onClick={() => dispatch(toggleSidebarCollapse())}
              className={`flex items-center gap-3 px-5 py-3 border border-gray-250 dark:border-dark-border rounded-xl text-sm font-semibold hover:bg-gray-50 dark:hover:bg-slate-800 transition-all active:scale-98
                ${sidebarCollapsed ? 'bg-primary-50/10 border-primary-500/30 text-primary-500' : 'text-gray-700 dark:text-gray-300'}
              `}
            >
              <SidebarIcon sx={{ fontSize: 18 }} />
              {sidebarCollapsed ? 'Expand Navigation Sidebar' : 'Collapse Navigation Sidebar'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
