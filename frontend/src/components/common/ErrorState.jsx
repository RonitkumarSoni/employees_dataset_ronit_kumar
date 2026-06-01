import React from 'react';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';

const ErrorState = ({ title = 'Failed to Load Data', message = 'Something went wrong while fetching the data from the server.', onRetry }) => {
  return (
    <div className="bg-red-50/50 dark:bg-red-950/10 border border-red-200/50 dark:border-red-900/30 rounded-2xl p-8 text-center">
      <div className="w-12 h-12 bg-red-100 dark:bg-red-950/30 text-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
        <ErrorOutlineOutlinedIcon sx={{ fontSize: 24 }} />
      </div>
      <h3 className="text-lg font-bold text-red-800 dark:text-red-400 mb-1">
        {title}
      </h3>
      <p className="text-red-600 dark:text-red-500/80 text-sm max-w-sm mx-auto mb-5">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all font-medium text-sm rounded-lg active:scale-95"
        >
          <RefreshIcon sx={{ fontSize: 16 }} />
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;
