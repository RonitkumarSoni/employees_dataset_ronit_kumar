import React from 'react';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import VerifiedIcon from '@mui/icons-material/Verified';

const getInitials = (name, fallback = 'EM') => {
  if (!name) return fallback;
  const parts = name.trim().split(/\s+/);
  if (parts.length > 1) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, Math.min(name.length, 2)).toUpperCase();
};

const RecentEmployees = ({ employees = [], loading = false }) => {
  if (loading) {
    return (
      <div className="bg-white dark:bg-dark-card border border-gray-200/50 dark:border-dark-border/50 rounded-2xl p-6 shadow-md space-y-4">
        <div className="h-6 w-36 bg-gray-200 dark:bg-dark-border rounded animate-pulse"></div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3 items-center">
              <div className="h-10 w-10 bg-gray-200 dark:bg-dark-border rounded-full animate-pulse"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/3 bg-gray-200 dark:bg-dark-border rounded animate-pulse"></div>
                <div className="h-3 w-1/4 bg-gray-200 dark:bg-dark-border rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-dark-card border border-gray-200/50 dark:border-dark-border/50 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-dark-text tracking-tight">
            New Joiners
          </h3>
          <Link
            to="/employees"
            className="text-xs font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 flex items-center gap-1 transition-colors"
          >
            View All
            <ArrowForwardIcon sx={{ fontSize: 14 }} />
          </Link>
        </div>

        {employees.length === 0 ? (
          <p className="text-gray-500 dark:text-dark-muted text-sm text-center py-8">
            No joiners found.
          </p>
        ) : (
          <div className="divide-y divide-gray-150 dark:divide-dark-border/40">
            {employees.slice(0, 5).map((employee) => (
              <div key={employee._id} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-dark-bg text-gray-600 dark:text-gray-300 font-bold flex items-center justify-center shrink-0 border border-gray-200/40 dark:border-dark-border/30">
                    {employee.name?.substring(0, 2).toUpperCase() || 'EM'}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-semibold text-gray-900 dark:text-dark-text truncate">
                        {employee.name}
                      </p>
                      {employee.isVerified && (
                        <VerifiedIcon sx={{ fontSize: 14 }} className="text-blue-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-dark-muted truncate">
                      {employee.jobTitle || 'Staff'} &bull; {employee.department || 'Operations'}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-dark-bg/60 text-slate-700 dark:text-slate-400 border border-slate-200/20">
                    {employee.country || 'N/A'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentEmployees;
