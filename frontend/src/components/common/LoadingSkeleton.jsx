import React from 'react';

export const StatsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="animate-pulse bg-white dark:bg-dark-card border border-gray-200/50 dark:border-dark-border/50 rounded-2xl p-6 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <div className="h-4 w-24 bg-gray-200 dark:bg-dark-border rounded"></div>
          <div className="h-10 w-10 bg-gray-200 dark:bg-dark-border rounded-xl"></div>
        </div>
        <div className="h-8 w-16 bg-gray-200 dark:bg-dark-border rounded mb-2"></div>
        <div className="h-4 w-32 bg-gray-200 dark:bg-dark-border rounded"></div>
      </div>
    ))}
  </div>
);

export const TableSkeleton = ({ rows = 5 }) => (
  <div className="animate-pulse bg-white dark:bg-dark-card border border-gray-200/50 dark:border-dark-border/50 rounded-2xl shadow-md overflow-hidden">
    <div className="h-16 bg-gray-50 dark:bg-dark-bg/50 border-b border-gray-200/50 dark:border-dark-border/50 flex items-center px-6 justify-between">
      <div className="h-6 w-36 bg-gray-200 dark:bg-dark-border rounded"></div>
      <div className="h-10 w-48 bg-gray-200 dark:bg-dark-border rounded-xl"></div>
    </div>
    <div className="p-6 space-y-4">
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="flex gap-4 items-center">
          <div className="h-12 w-12 bg-gray-200 dark:bg-dark-border rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 w-1/4 bg-gray-200 dark:bg-dark-border rounded"></div>
            <div className="h-3 w-1/3 bg-gray-200 dark:bg-dark-border rounded"></div>
          </div>
          <div className="h-4 w-16 bg-gray-200 dark:bg-dark-border rounded"></div>
          <div className="h-4 w-24 bg-gray-200 dark:bg-dark-border rounded"></div>
        </div>
      ))}
    </div>
  </div>
);

export const ChartSkeleton = () => (
  <div className="animate-pulse bg-white dark:bg-dark-card border border-gray-200/50 dark:border-dark-border/50 rounded-2xl p-6 shadow-md h-80 flex flex-col justify-between">
    <div className="h-6 w-48 bg-gray-200 dark:bg-dark-border rounded mb-4"></div>
    <div className="flex-1 flex gap-4 items-end pb-4">
      {[40, 70, 50, 90, 60, 80, 45].map((height, i) => (
        <div key={i} style={{ height: `${height}%` }} className="flex-1 bg-gray-200 dark:bg-dark-border rounded-t-lg"></div>
      ))}
    </div>
  </div>
);

const LoadingSkeleton = () => <TableSkeleton />;

export default LoadingSkeleton;
