import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CircularProgress from '@mui/material/CircularProgress';

const EmployeeForm = ({ employee = null, onSubmit, onCancel, loading = false }) => {
  const isEdit = !!employee;

  // Initial flat values mapped from nested object
  const initialValues = {
    employeeId: employee?.employeeId || '',
    name: employee?.name || '',
    email: employee?.profile?.contact?.email || employee?.email || '',
    phone: employee?.profile?.contact?.phone || '',
    city: employee?.profile?.contact?.address?.city || '',
    state: employee?.profile?.contact?.address?.location?.state || '',
    country: employee?.profile?.contact?.address?.location?.country || employee?.country || '',
    role: employee?.role || 'Developer',
    salary: employee?.salary || 50000,
    status: employee?.status || 'Active',
    primarySkill: employee?.profile?.projects?.[0]?.tasks?.[0]?.assignedTo?.skills?.primary || '',
    experienceYears: employee?.profile?.projects?.[0]?.tasks?.[0]?.assignedTo?.skills?.experience?.years || 0,
  };

  const validationSchema = Yup.object({
    employeeId: Yup.string()
      .required('Employee ID is required')
      .matches(/^[A-Za-z0-9-]+$/, 'Employee ID must be alphanumeric'),
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    phone: Yup.string().nullable(),
    city: Yup.string().nullable(),
    state: Yup.string().nullable(),
    country: Yup.string()
      .required('Country is required'),
    role: Yup.string()
      .oneOf(['Developer', 'Designer', 'Manager', 'Analyst', 'HR'], 'Invalid role')
      .required('Role is required'),
    salary: Yup.number()
      .min(0, 'Salary cannot be negative')
      .required('Salary is required'),
    status: Yup.string()
      .oneOf(['Active', 'On Leave', 'Terminated'], 'Invalid status')
      .required('Status is required'),
    primarySkill: Yup.string().nullable(),
    experienceYears: Yup.number().min(0, 'Experience cannot be negative').nullable(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      // Map flat form values back to nested schema structure expected by backend
      const mappedData = {
        employeeId: values.employeeId,
        name: values.name,
        role: values.role,
        salary: values.salary,
        status: values.status,
        profile: {
          contact: {
            email: values.email,
            phone: values.phone,
            address: {
              city: values.city,
              location: {
                state: values.state,
                country: values.country,
              },
            },
          },
          // Build minimal projects structure to hold skill data if present
          projects: values.primarySkill ? [
            {
              projectId: 'proj-1',
              name: 'Internal Project',
              tasks: [
                {
                  taskId: 'task-1',
                  description: 'Default assignment',
                  assignedTo: {
                    id: values.employeeId,
                    name: values.name,
                    skills: {
                      primary: values.primarySkill,
                      secondary: [],
                      experience: {
                        years: values.experienceYears,
                        domains: [],
                        certifications: {
                          current: [],
                          expired: [],
                          meta: {
                            verified: false,
                            lastUpdated: new Date().toISOString().split('T')[0],
                          },
                        },
                      },
                    },
                  },
                },
              ],
            },
          ] : [],
        },
      };

      onSubmit(mappedData);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Employee ID */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5" htmlFor="employeeId">
            Employee ID
          </label>
          <input
            id="employeeId"
            name="employeeId"
            type="text"
            placeholder="e.g. EMP-101"
            disabled={isEdit}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.employeeId}
            className={`input-field disabled:bg-gray-150 dark:disabled:bg-slate-800 disabled:text-gray-400 dark:disabled:text-gray-500
              ${formik.touched.employeeId && formik.errors.employeeId ? 'border-red-500 ring-2 ring-red-500/20' : ''}
            `}
          />
          {formik.touched.employeeId && formik.errors.employeeId && (
            <p className="text-red-500 text-xs mt-1 font-medium">{formik.errors.employeeId}</p>
          )}
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5" htmlFor="name">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="e.g. Alice Smith"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className={`input-field ${formik.touched.name && formik.errors.name ? 'border-red-500 ring-2 ring-red-500/20' : ''}`}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-xs mt-1 font-medium">{formik.errors.name}</p>
          )}
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="e.g. alice@company.com"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={`input-field ${formik.touched.email && formik.errors.email ? 'border-red-500 ring-2 ring-red-500/20' : ''}`}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-xs mt-1 font-medium">{formik.errors.email}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5" htmlFor="phone">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            placeholder="e.g. +1 555 123 4567"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            className="input-field"
          />
        </div>

        {/* Role Select */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5" htmlFor="role">
            Role
          </label>
          <select
            id="role"
            name="role"
            onChange={formik.handleChange}
            value={formik.values.role}
            className="input-field"
          >
            {['Developer', 'Designer', 'Manager', 'Analyst', 'HR'].map((roleOpt) => (
              <option key={roleOpt} value={roleOpt}>{roleOpt}</option>
            ))}
          </select>
        </div>

        {/* Salary */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5" htmlFor="salary">
            Salary (USD)
          </label>
          <input
            id="salary"
            name="salary"
            type="number"
            placeholder="e.g. 75000"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.salary}
            className={`input-field ${formik.touched.salary && formik.errors.salary ? 'border-red-500 ring-2 ring-red-500/20' : ''}`}
          />
          {formik.touched.salary && formik.errors.salary && (
            <p className="text-red-500 text-xs mt-1 font-medium">{formik.errors.salary}</p>
          )}
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5" htmlFor="country">
            Country
          </label>
          <input
            id="country"
            name="country"
            type="text"
            placeholder="e.g. United States"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.country}
            className={`input-field ${formik.touched.country && formik.errors.country ? 'border-red-500 ring-2 ring-red-500/20' : ''}`}
          />
          {formik.touched.country && formik.errors.country && (
            <p className="text-red-500 text-xs mt-1 font-medium">{formik.errors.country}</p>
          )}
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5" htmlFor="city">
            City
          </label>
          <input
            id="city"
            name="city"
            type="text"
            placeholder="e.g. San Francisco"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
            className="input-field"
          />
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5" htmlFor="state">
            State / Region
          </label>
          <input
            id="state"
            name="state"
            type="text"
            placeholder="e.g. CA"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.state}
            className="input-field"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            name="status"
            onChange={formik.handleChange}
            value={formik.values.status}
            className="input-field"
          >
            {['Active', 'On Leave', 'Terminated'].map((statusOpt) => (
              <option key={statusOpt} value={statusOpt}>{statusOpt}</option>
            ))}
          </select>
        </div>

        {/* Primary Skill */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5" htmlFor="primarySkill">
            Primary Skill
          </label>
          <input
            id="primarySkill"
            name="primarySkill"
            type="text"
            placeholder="e.g. ReactJS"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.primarySkill}
            className="input-field"
          />
        </div>

        {/* Experience Years */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5" htmlFor="experienceYears">
            Years of Experience
          </label>
          <input
            id="experienceYears"
            name="experienceYears"
            type="number"
            placeholder="e.g. 5"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.experienceYears}
            className="input-field"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-150 dark:border-dark-border/40">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="btn-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="btn-primary flex items-center gap-2"
        >
          {loading && <CircularProgress size={16} color="inherit" />}
          {isEdit ? 'Save Changes' : 'Create Record'}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
