import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import employeeReducer from '../features/employees/employeeSlice';
import analyticsReducer from '../features/analytics/analyticsSlice';
import uiReducer from '../features/ui/uiSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    employees: employeeReducer,
    analytics: analyticsReducer,
    ui: uiReducer,
  },
  devTools: import.meta.env.DEV,
});

export default store;
