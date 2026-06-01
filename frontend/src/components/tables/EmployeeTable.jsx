import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import VerifiedIcon from '@mui/icons-material/Verified';

const EmployeeTable = ({
  employees = [],
  loading = false,
  isAdmin = false,
  filters = {},
  totalCount = 0,
  onEdit,
  onDelete,
  onSort,
  onPageChange,
  onLimitChange,
}) => {
  const { page, limit, sort } = filters;

  const handleSortClick = (field) => {
    if (!onSort) return;
    const isAsc = sort === field;
    onSort(isAsc ? `-${field}` : field);
  };

  const renderSortIndicator = (field) => {
    if (sort === field) {
      return <ArrowUpwardIcon sx={{ fontSize: 14 }} className="ml-1 text-primary-500" />;
    }
    if (sort === `-${field}`) {
      return <ArrowDownwardIcon sx={{ fontSize: 14 }} className="ml-1 text-primary-500" />;
    }
    return null;
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400 border-green-200/20';
      case 'On Leave':
        return 'bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-200/20';
      case 'Terminated':
        return 'bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400 border-red-200/20';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200/20';
    }
  };

  const totalPages = Math.ceil(totalCount / limit) || 1;

  return (
    <div className="bg-white dark:bg-dark-card border border-gray-200/50 dark:border-dark-border/50 rounded-2xl shadow-md overflow-hidden flex flex-col justify-between transition-colors duration-300">
      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse" style={{ minWidth: '900px' }}>
          <thead>
            <tr className="bg-slate-50/75 dark:bg-dark-bg/60 border-b border-gray-200/50 dark:border-dark-border/50 text-xs font-semibold text-gray-500 dark:text-dark-muted uppercase tracking-wider">
              <th className="px-6 py-4 cursor-pointer hover:text-gray-900 dark:hover:text-dark-text select-none" onClick={() => handleSortClick('employeeId')}>
                <div className="flex items-center">ID {renderSortIndicator('employeeId')}</div>
              </th>
              <th className="px-6 py-4 cursor-pointer hover:text-gray-900 dark:hover:text-dark-text select-none min-w-[280px]" onClick={() => handleSortClick('name')}>
                <div className="flex items-center">Name {renderSortIndicator('name')}</div>
              </th>
              <th className="px-6 py-4">Department & Role</th>
              <th className="px-6 py-4 cursor-pointer hover:text-gray-900 dark:hover:text-dark-text select-none" onClick={() => handleSortClick('profile.contact.address.location.country')}>
                <div className="flex items-center">Country {renderSortIndicator('profile.contact.address.location.country')}</div>
              </th>
              <th className="px-6 py-4 cursor-pointer hover:text-gray-900 dark:hover:text-dark-text select-none" onClick={() => handleSortClick('salary')}>
                <div className="flex items-center">Salary {renderSortIndicator('salary')}</div>
              </th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-gray-150 dark:divide-dark-border/40 text-sm">
            {loading ? (
              [...Array(limit)].map((_, idx) => (
                <tr key={idx} className="animate-pulse">
                  <td className="px-6 py-4"><div className="h-4 w-12 bg-gray-200 dark:bg-dark-border rounded"></div></td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-200 dark:bg-dark-border rounded-full shrink-0"></div>
                      <div className="space-y-1.5 flex-1">
                        <div className="h-4 w-28 bg-gray-200 dark:bg-dark-border rounded"></div>
                        <div className="h-3 w-36 bg-gray-200 dark:bg-dark-border rounded"></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4"><div className="h-4 w-24 bg-gray-200 dark:bg-dark-border rounded"></div></td>
                  <td className="px-6 py-4"><div className="h-4 w-16 bg-gray-200 dark:bg-dark-border rounded"></div></td>
                  <td className="px-6 py-4"><div className="h-4 w-16 bg-gray-200 dark:bg-dark-border rounded"></div></td>
                  <td className="px-6 py-4"><div className="h-6 w-16 bg-gray-200 dark:bg-dark-border rounded-full"></div></td>
                  <td className="px-6 py-4 text-right"><div className="h-8 w-16 bg-gray-200 dark:bg-dark-border rounded ml-auto"></div></td>
                </tr>
              ))
            ) : employees.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-12 text-center text-gray-500 dark:text-dark-muted font-medium">
                  No employee records found matching your filters.
                </td>
              </tr>
            ) : (
              employees.map((employee) => (
                <tr key={employee._id} className="hover:bg-slate-50/50 dark:hover:bg-dark-bg/20 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-gray-500 dark:text-dark-muted">
                    {employee.employeeId}
                  </td>
                  <td className="px-6 py-4 min-w-[280px]">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary-50 to-indigo-50 dark:from-primary-950/20 dark:to-indigo-950/20 text-primary-600 dark:text-primary-400 font-bold text-sm flex items-center justify-center shrink-0 border border-primary-200/20 shadow-sm">
                        {employee.name?.substring(0, 2).toUpperCase() || 'EM'}
                      </div>
                      <div className="min-w-0 flex-1 flex flex-col justify-center">
                        <div className="flex items-center gap-1.5">
                          <p className="font-semibold text-gray-900 dark:text-dark-text truncate">
                            {employee.name}
                          </p>
                          {employee.isVerified && (
                            <VerifiedIcon sx={{ fontSize: 13 }} className="text-blue-500 shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-dark-muted truncate mt-0.5">
                          {employee.profile?.contact?.email || employee.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-800 dark:text-dark-text">
                      {employee.role || 'Staff'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-dark-muted">
                      {employee.department || 'Operations'}
                    </p>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-600 dark:text-gray-300">
                    {employee.profile?.contact?.address?.location?.country || employee.country || 'N/A'}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-dark-text">
                    ${employee.salary?.toLocaleString() || 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 border text-xs font-semibold rounded-full ${getStatusClass(employee.status)}`}>
                      {employee.status || 'Active'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      {isAdmin ? (
                        <>
                          <button
                            onClick={() => onEdit && onEdit(employee)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                            title="Edit Employee"
                          >
                            <EditIcon sx={{ fontSize: 18 }} />
                          </button>
                          <button
                            onClick={() => onDelete && onDelete(employee._id)}
                            className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                            title="Delete Employee"
                          >
                            <DeleteIcon sx={{ fontSize: 18 }} />
                          </button>
                        </>
                      ) : (
                        <span className="text-xs text-gray-400 italic">Read-only</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {!loading && employees.length > 0 && (
        <div className="px-6 py-4 bg-slate-50/50 dark:bg-dark-bg/40 border-t border-gray-200/50 dark:border-dark-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 dark:text-dark-muted font-medium">Rows per page:</span>
            <select
              value={limit}
              onChange={(e) => onLimitChange && onLimitChange(Number(e.target.value))}
              className="px-2.5 py-1 bg-white dark:bg-dark-card border border-gray-250 dark:border-dark-border rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
              {[5, 10, 20, 50].map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
            <span className="text-xs text-gray-500 dark:text-dark-muted">
              Showing {Math.min(totalCount, (page - 1) * limit + 1)}-{Math.min(totalCount, page * limit)} of {totalCount}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              disabled={page <= 1}
              onClick={() => onPageChange && onPageChange(page - 1)}
              className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-dark-border text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, i) => {
              const p = i + 1;
              // Simple slide window pagination
              if (totalPages > 5 && Math.abs(page - p) > 1 && p !== 1 && p !== totalPages) {
                if (p === 2 || p === totalPages - 1) {
                  return <span key={p} className="px-1 text-gray-400">...</span>;
                }
                return null;
              }
              return (
                <button
                  key={p}
                  onClick={() => onPageChange && onPageChange(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all
                    ${
                      page === p
                        ? 'bg-primary-600 text-white shadow-sm shadow-primary-500/20'
                        : 'border border-gray-200 dark:border-dark-border text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800'
                    }
                  `}
                >
                  {p}
                </button>
              );
            })}

            <button
              disabled={page >= totalPages}
              onClick={() => onPageChange && onPageChange(page + 1)}
              className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-dark-border text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;
