import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchEmployees = createAsyncThunk('employees/fetchAll', async (params = {}, { rejectWithValue }) => {
  try {
    const response = await api.get('/employees', { params });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch employees');
  }
});

export const fetchEmployeeById = createAsyncThunk('employees/fetchById', async (id, { rejectWithValue }) => {
  try {
    const response = await api.get(`/employees/${id}`);
    return response.data.data.employee;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch employee');
  }
});

export const createEmployee = createAsyncThunk('employees/create', async (data, { rejectWithValue }) => {
  try {
    const response = await api.post('/employees', data);
    return response.data.data.employee;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to create employee');
  }
});

export const updateEmployee = createAsyncThunk('employees/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await api.patch(`/employees/${id}`, data);
    return response.data.data.employee;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update employee');
  }
});

export const deleteEmployee = createAsyncThunk('employees/delete', async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/employees/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to delete employee');
  }
});

export const searchEmployees = createAsyncThunk('employees/search', async (query, { rejectWithValue }) => {
  try {
    const response = await api.get('/search/employees', { params: { q: query } });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Search failed');
  }
});

const initialState = {
  list: [],
  selectedEmployee: null,
  totalCount: 0,
  results: 0,
  loading: false,
  error: null,
  searchResults: [],
  searchLoading: false,
  filters: {
    page: 1,
    limit: 10,
    sort: '-createdAt',
    search: '',
  },
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearSelectedEmployee: (state) => {
      state.selectedEmployee = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchEmployees.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data.employees;
        state.totalCount = action.payload.total || action.payload.results;
        state.results = action.payload.results;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch By Id
      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.selectedEmployee = action.payload;
      })
      // Create
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
        state.totalCount += 1;
      })
      // Update
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.list.findIndex(emp => emp._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
      })
      // Delete
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.list = state.list.filter(emp => emp._id !== action.payload);
        state.totalCount -= 1;
      })
      // Search
      .addCase(searchEmployees.pending, (state) => { state.searchLoading = true; })
      .addCase(searchEmployees.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = action.payload.data.employees;
      })
      .addCase(searchEmployees.rejected, (state) => { state.searchLoading = false; });
  },
});

export const { setFilters, clearSelectedEmployee, clearError, clearSearchResults } = employeeSlice.actions;
export default employeeSlice.reducer;
