import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearError } from '../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import SEO from '../components/common/SEO';
import CircularProgress from '@mui/material/CircularProgress';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'user',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .required('Full name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email address is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
      role: Yup.string()
        .oneOf(['user', 'admin'], 'Invalid role selected')
        .required('Role is required'),
    }),
    onSubmit: (values) => {
      const { name, email, password, role } = values;
      dispatch(registerUser({ name, email, password, role }));
    },
  });

  return (
    <>
      <SEO
        title="Sign Up"
        description="Register a new account on Aegis Employee Management Analytics. Enterprise portal sign up."
      />
      <div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight mb-2">
          Create Account
        </h2>
        <p className="text-slate-400 text-sm mb-6">
          Sign up to get access to Aegis Management suite.
        </p>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-1" htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="e.g. John Doe"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className={`w-full px-4 py-2.5 bg-slate-950 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all duration-200
                ${
                  formik.touched.name && formik.errors.name
                    ? 'border-red-500/60 focus:border-red-500'
                    : 'border-slate-800 focus:border-primary-500'
                }
              `}
            />
            {formik.touched.name && formik.errors.name ? (
              <p className="text-red-500 text-xs mt-1 font-medium">{formik.errors.name}</p>
            ) : null}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="e.g. employee@company.com"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={`w-full px-4 py-2.5 bg-slate-950 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all duration-200
                ${
                  formik.touched.email && formik.errors.email
                    ? 'border-red-500/60 focus:border-red-500'
                    : 'border-slate-800 focus:border-primary-500'
                }
              `}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-red-500 text-xs mt-1 font-medium">{formik.errors.email}</p>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-1" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Min 8 chars"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className={`w-full px-4 py-2.5 bg-slate-950 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all duration-200
                  ${
                    formik.touched.password && formik.errors.password
                      ? 'border-red-500/60 focus:border-red-500'
                      : 'border-slate-800 focus:border-primary-500'
                  }
                `}
              />
              {formik.touched.password && formik.errors.password ? (
                <p className="text-red-500 text-xs mt-1 font-medium">{formik.errors.password}</p>
              ) : null}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-1" htmlFor="confirmPassword">
                Confirm
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Re-enter"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                className={`w-full px-4 py-2.5 bg-slate-950 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all duration-200
                  ${
                    formik.touched.confirmPassword && formik.errors.confirmPassword
                      ? 'border-red-500/60 focus:border-red-500'
                      : 'border-slate-800 focus:border-primary-500'
                  }
                `}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <p className="text-red-500 text-xs mt-1 font-medium">{formik.errors.confirmPassword}</p>
              ) : null}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-1" htmlFor="role">
              Account Role
            </label>
            <select
              id="role"
              name="role"
              onChange={formik.handleChange}
              value={formik.values.role}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all duration-200"
            >
              <option value="user">User (View Directory & Profile)</option>
              <option value="admin">Admin (Full CRUD & Aggregation Analytics)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 hover:bg-primary-500 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 active:scale-[0.98] shadow-lg shadow-primary-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <>
                <CircularProgress size={18} color="inherit" />
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-slate-400 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-400 hover:text-primary-300 font-semibold transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
