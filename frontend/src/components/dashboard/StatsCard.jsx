import React from 'react';

const StatsCard = ({ title, value, icon, description, trend, trendType = 'neutral' }) => {
  return (
    <div className="bg-white dark:bg-dark-card border border-gray-200/50 dark:border-dark-border/50 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
      {/* Decorative hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="flex justify-between items-start relative z-10">
        <div>
          <p className="text-sm font-semibold text-gray-500 dark:text-dark-muted tracking-tight">
            {title}
          </p>
          <h3 className="text-3xl font-extrabold text-gray-900 dark:text-dark-text mt-2 mb-1 tracking-tight">
            {value}
          </h3>
        </div>

        <div className="w-12 h-12 bg-primary-50 dark:bg-primary-950/20 text-primary-500 dark:text-primary-400 rounded-xl flex items-center justify-center shadow-inner shrink-0 group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 relative z-10 text-xs font-medium">
        {trend && (
          <span
            className={`px-2 py-0.5 rounded-full font-semibold
              ${
                trendType === 'up'
                  ? 'bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400'
                  : trendType === 'down'
                  ? 'bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              }
            `}
          >
            {trend}
          </span>
        )}
        <span className="text-gray-500 dark:text-dark-muted truncate">
          {description}
        </span>
      </div>
    </div>
  );
};

export default StatsCard;
