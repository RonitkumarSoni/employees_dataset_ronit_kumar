import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  setFilters,
  clearSelectedEmployee,
} from '../features/employees/employeeSlice';
import EmployeeTable from '../components/tables/EmployeeTable';
import EmployeeForm from '../components/forms/EmployeeForm';
import SEO from '../components/common/SEO';
import EmptyState from '../components/common/EmptyState';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';

const Employees = () => {
  const dispatch = useDispatch();
  const { list: employees, totalCount, loading, error, filters } = useSelector((state) => state.employees);
  const { user } = useSelector((state) => state.auth);

  const isAdmin = user?.role === 'admin';

  // Form Modal States
  const [formOpen, setFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Delete Confirm Dialog States
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Search input state (debounced locally)
  const [searchTerm, setSearchTerm] = useState(filters.search || '');

  // Sync data fetch when filters change
  useEffect(() => {
    dispatch(fetchEmployees(filters));
  }, [dispatch, filters]);

  // Sync local search term with filter search term
  useEffect(() => {
    setSearchTerm(filters.search);
  }, [filters.search]);

  // Handle local search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(setFilters({ search: searchTerm, page: 1 }));
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    dispatch(setFilters({ search: '', page: 1, sort: '-createdAt' }));
  };

  // CRUD Actions
  const handleAddClick = () => {
    setEditingEmployee(null);
    setFormOpen(true);
  };

  const handleEditClick = (employee) => {
    setEditingEmployee(employee);
    setFormOpen(true);
  };

  const handleDeleteClick = (id) => {
    setEmployeeToDelete(id);
    setDeleteOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    setActionLoading(true);
    try {
      if (editingEmployee) {
        // Edit record
        await dispatch(updateEmployee({ id: editingEmployee._id, data: formData })).unwrap();
        toast.success('Employee updated successfully');
      } else {
        // Create record
        await dispatch(createEmployee(formData)).unwrap();
        toast.success('Employee created successfully');
      }
      setFormOpen(false);
    } catch (err) {
      toast.error(err || 'Failed to submit form');
    } finally {
      setActionLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!employeeToDelete) return;
    setActionLoading(true);
    try {
      await dispatch(deleteEmployee(employeeToDelete)).unwrap();
      toast.success('Employee deleted successfully');
      setDeleteOpen(false);
    } catch (err) {
      toast.error(err || 'Failed to delete record');
    } finally {
      setActionLoading(false);
      setEmployeeToDelete(null);
    }
  };

  return (
    <>
      <SEO
        title="Employee Directory"
        description="Search, view, filter and manage Aegis enterprise employees directory."
      />
      <div className="space-y-6">
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-dark-text tracking-tight">
              Employee Directory
            </h1>
            <p className="text-sm text-gray-500 dark:text-dark-muted">
              Search and manage official employee records and credentials.
            </p>
          </div>
          {isAdmin && (
            <button
              onClick={handleAddClick}
              className="btn-primary inline-flex items-center gap-2"
            >
              <AddIcon sx={{ fontSize: 18 }} />
              Add Employee
            </button>
          )}
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between bg-white dark:bg-dark-card border border-gray-200/50 dark:border-dark-border/50 rounded-2xl p-4 shadow-sm">
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md relative flex items-center">
            <input
              type="text"
              placeholder="Search by name, email, or country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 placeholder-gray-400 dark:placeholder-gray-500"
            />
            <SearchIcon sx={{ fontSize: 18 }} className="absolute left-3.5 text-gray-400" />
            <button type="submit" className="hidden">Search</button>
          </form>

          <div className="flex items-center gap-2">
            {filters.search && (
              <button
                onClick={handleClearFilters}
                className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-slate-800 text-xs font-semibold text-gray-500 dark:text-gray-400 transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        </div>

        {/* Directory Grid/Table */}
        {error ? (
          <div className="py-6">
            <EmptyState
              title="Error Loading Data"
              message={error}
              actionText="Retry"
              onAction={() => dispatch(fetchEmployees(filters))}
            />
          </div>
        ) : (
          <EmployeeTable
            employees={employees}
            loading={loading}
            isAdmin={isAdmin}
            filters={filters}
            totalCount={totalCount}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
            onSort={(sortVal) => dispatch(setFilters({ sort: sortVal, page: 1 }))}
            onPageChange={(pageVal) => dispatch(setFilters({ page: pageVal }))}
            onLimitChange={(limitVal) => dispatch(setFilters({ limit: limitVal, page: 1 }))}
          />
        )}

        {/* Modal Dialog for Employee Form */}
        <Dialog
          open={formOpen}
          onClose={() => !actionLoading && setFormOpen(false)}
          maxWidth="md"
          fullWidth
          PaperProps={{
            className: 'bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text rounded-2xl shadow-xl border border-gray-100 dark:border-dark-border/50',
          }}
        >
          <DialogTitle className="flex justify-between items-center border-b border-gray-150 dark:border-dark-border/40 pb-4">
            <span className="font-extrabold text-lg tracking-tight">
              {editingEmployee ? 'Edit Employee Details' : 'Register New Employee'}
            </span>
            <IconButton onClick={() => setFormOpen(false)} disabled={actionLoading}>
              <CloseIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </DialogTitle>
          <DialogContent className="pt-6">
            <EmployeeForm
              employee={editingEmployee}
              loading={actionLoading}
              onSubmit={handleFormSubmit}
              onCancel={() => setFormOpen(false)}
            />
          </DialogContent>
        </Dialog>

        {/* Confirm Delete Dialog */}
        <Dialog
          open={deleteOpen}
          onClose={() => !actionLoading && setDeleteOpen(false)}
          PaperProps={{
            className: 'bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text rounded-2xl p-2 max-w-sm',
          }}
        >
          <DialogContent className="text-center pt-6">
            <div className="w-12 h-12 bg-red-50 dark:bg-red-950/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <DeleteIcon sx={{ fontSize: 24 }} />
            </div>
            <h3 className="text-lg font-bold mb-1.5">Delete Employee Record?</h3>
            <p className="text-xs text-gray-500 dark:text-dark-muted mb-6 leading-relaxed">
              Are you sure you want to delete this employee record? This action is permanent and cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteOpen(false)}
                disabled={actionLoading}
                className="flex-1 btn-secondary text-xs"
              >
                No, Keep it
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={actionLoading}
                className="flex-1 btn-danger text-xs flex items-center justify-center gap-1.5"
              >
                {actionLoading && <CircularProgress size={12} color="inherit" />}
                Yes, Delete
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default Employees;
