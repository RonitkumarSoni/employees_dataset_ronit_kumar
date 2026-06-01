import React from 'react';

const ChartCard = ({ title, subtitle, children, extra }) => {
  return (
    <div className="bg-white dark:bg-dark-card border border-gray-200/50 dark:border-dark-border/50 rounded-2xl p-6 shadow-md flex flex-col justify-between h-full hover:shadow-lg transition-all duration-300 relative group overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-dark-text tracking-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-gray-500 dark:text-dark-muted mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
        {extra && <div className="shrink-0">{extra}</div>}
      </div>

      {/* Chart Body */}
      <div className="flex-1 w-full relative min-h-[240px]">
        {children}
      </div>
    </div>
  );
};

export default ChartCard;
