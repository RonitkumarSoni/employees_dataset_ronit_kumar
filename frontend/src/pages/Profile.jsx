import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateProfile, changePassword } from '../features/auth/authSlice';
import SEO from '../components/common/SEO';
import CircularProgress from '@mui/material/CircularProgress';
import SecurityIcon from '@mui/icons-material/Security';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { toast } from 'react-toastify';

const getInitials = (name, fallback = 'US') => {
  if (!name) return fallback;
  const parts = name.trim().split(/\s+/);
  if (parts.length > 1) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, Math.min(name.length, 2)).toUpperCase();
};

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  // Profile Update Form
  const profileFormik = useFormik({
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .required('Name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    }),
    onSubmit: async (values) => {
      try {
        await dispatch(updateProfile(values)).unwrap();
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err || 'Failed to update profile');
      }
    },
  });

  // Password Change Form
  const passwordFormik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required('Current password is required'),
      newPassword: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('New password is required'),
      confirmNewPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm new password is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await dispatch(
          changePassword({
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
          })
        ).unwrap();
        toast.success('Password changed successfully');
        resetForm();
      } catch (err) {
        toast.error(err || 'Failed to change password');
      }
    },
  });

  return (
    <>
      <SEO
        title="My Profile"
        description="Manage your Aegis employee account profile information and passwords."
      />
      <div className="space-y-6 max-w-7xl mx-auto">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-dark-text tracking-tight">
            Account Profile
          </h1>
          <p className="text-sm text-gray-500 dark:text-dark-muted">
            Manage your personal credentials, contact info, and security credentials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left card: User Avatar & Role */}
          <div className="md:col-span-1 bg-white dark:bg-dark-card border border-gray-200/50 dark:border-dark-border/50 rounded-2xl p-6 shadow-md text-center h-fit">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary-500 to-indigo-500 flex items-center justify-center text-white font-extrabold text-3xl mx-auto shadow-md mb-4 border-4 border-white dark:border-slate-800">
              {getInitials(user?.name, 'US')}
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 dark:text-dark-text">
              {user?.name || 'User'}
            </h3>
            
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 border border-primary-200/20 mt-2 mb-4">
              {user?.role || 'user'}
            </span>

            <div className="border-t border-gray-150 dark:border-dark-border/50 pt-4 text-left text-xs text-gray-500 dark:text-dark-muted space-y-2">
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Verification Status:</strong> {user?.isVerified ? 'Verified Account' : 'Standard'}</p>
              <p><strong>Member Since:</strong> {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
            </div>
          </div>

          {/* Right forms container */}
          <div className="md:col-span-2 space-y-6">
            {/* Profile Info Form */}
            <div className="bg-white dark:bg-dark-card border border-gray-200/50 dark:border-dark-border/50 rounded-2xl p-6 shadow-md">
              <h3 className="text-base font-bold text-gray-900 dark:text-dark-text mb-4 flex items-center gap-2">
                <AccountBoxIcon className="text-primary-500" sx={{ fontSize: 20 }} />
                Update Profile Info
              </h3>

              <form onSubmit={profileFormik.handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1" htmlFor="name">
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      onChange={profileFormik.handleChange}
                      onBlur={profileFormik.handleBlur}
                      value={profileFormik.values.name}
                      className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-sm
                        ${profileFormik.touched.name && profileFormik.errors.name ? 'border-red-500 ring-1 ring-red-500' : ''}
                      `}
                    />
                    {profileFormik.touched.name && profileFormik.errors.name && (
                      <p className="text-red-500 text-xs mt-1">{profileFormik.errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      onChange={profileFormik.handleChange}
                      onBlur={profileFormik.handleBlur}
                      value={profileFormik.values.email}
                      className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-sm
                        ${profileFormik.touched.email && profileFormik.errors.email ? 'border-red-500 ring-1 ring-red-500' : ''}
                      `}
                    />
                    {profileFormik.touched.email && profileFormik.errors.email && (
                      <p className="text-red-500 text-xs mt-1">{profileFormik.errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary text-xs flex items-center gap-1.5"
                  >
                    {loading && <CircularProgress size={12} color="inherit" />}
                    Save Info
                  </button>
                </div>
              </form>
            </div>

            {/* Password Change Form */}
            <div className="bg-white dark:bg-dark-card border border-gray-200/50 dark:border-dark-border/50 rounded-2xl p-6 shadow-md">
              <h3 className="text-base font-bold text-gray-900 dark:text-dark-text mb-4 flex items-center gap-2">
                <SecurityIcon className="text-primary-500" sx={{ fontSize: 20 }} />
                Change Account Password
              </h3>

              <form onSubmit={passwordFormik.handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1" htmlFor="currentPassword">
                    Current Password
                  </label>
                  <input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    placeholder="••••••••"
                    onChange={passwordFormik.handleChange}
                    onBlur={passwordFormik.handleBlur}
                    value={passwordFormik.values.currentPassword}
                    className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-sm
                      ${passwordFormik.touched.currentPassword && passwordFormik.errors.currentPassword ? 'border-red-500 ring-1 ring-red-500' : ''}
                    `}
                  />
                  {passwordFormik.touched.currentPassword && passwordFormik.errors.currentPassword && (
                    <p className="text-red-500 text-xs mt-1">{passwordFormik.errors.currentPassword}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1" htmlFor="newPassword">
                      New Password
                    </label>
                    <input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      placeholder="Min 8 chars"
                      onChange={passwordFormik.handleChange}
                      onBlur={passwordFormik.handleBlur}
                      value={passwordFormik.values.newPassword}
                      className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-sm
                        ${passwordFormik.touched.newPassword && passwordFormik.errors.newPassword ? 'border-red-500 ring-1 ring-red-500' : ''}
                      `}
                    />
                    {passwordFormik.touched.newPassword && passwordFormik.errors.newPassword && (
                      <p className="text-red-500 text-xs mt-1">{passwordFormik.errors.newPassword}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1" htmlFor="confirmNewPassword">
                      Confirm New Password
                    </label>
                    <input
                      id="confirmNewPassword"
                      name="confirmNewPassword"
                      type="password"
                      placeholder="••••••••"
                      onChange={passwordFormik.handleChange}
                      onBlur={passwordFormik.handleBlur}
                      value={passwordFormik.values.confirmNewPassword}
                      className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-sm
                        ${passwordFormik.touched.confirmNewPassword && passwordFormik.errors.confirmNewPassword ? 'border-red-500 ring-1 ring-red-500' : ''}
                      `}
                    />
                    {passwordFormik.touched.confirmNewPassword && passwordFormik.errors.confirmNewPassword && (
                      <p className="text-red-500 text-xs mt-1">{passwordFormik.errors.confirmNewPassword}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary text-xs flex items-center gap-1.5"
                  >
                    {loading && <CircularProgress size={12} color="inherit" />}
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
