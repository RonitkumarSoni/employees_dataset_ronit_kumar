import React from 'react';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';

const EmptyState = ({ title = 'No Data Found', message = 'There are no records to display at the moment.', icon, actionText, onAction }) => {
  return (
    <div className="bg-white dark:bg-dark-card border border-gray-200/50 dark:border-dark-border/50 rounded-2xl p-12 text-center shadow-md">
      <div className="w-16 h-16 bg-primary-50 dark:bg-primary-950/20 text-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
        {icon || <InboxOutlinedIcon sx={{ fontSize: 32 }} />}
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-dark-text mb-2">
        {title}
      </h3>
      <p className="text-gray-500 dark:text-dark-muted max-w-sm mx-auto mb-6 text-sm leading-relaxed">
        {message}
      </p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="btn-primary inline-flex items-center gap-2"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
