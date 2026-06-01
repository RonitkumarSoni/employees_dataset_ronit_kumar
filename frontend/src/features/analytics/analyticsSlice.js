import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchStats = createAsyncThunk('analytics/fetchStats', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/analytics/stats');
    return response.data.data.stats;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch stats');
  }
});

export const fetchSkillDistribution = createAsyncThunk('analytics/skillDist', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/analytics/employees/skill-distribution');
    return response.data.data.distribution;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch skill distribution');
  }
});

export const fetchDomainDistribution = createAsyncThunk('analytics/domainDist', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/analytics/employees/domain-distribution');
    return response.data.data.distribution;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch domain distribution');
  }
});

export const fetchCountryAnalysis = createAsyncThunk('analytics/countryAnalysis', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/analytics/employees/country-analysis');
    return response.data.data.distribution;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch country analysis');
  }
});

export const fetchExperienceAnalysis = createAsyncThunk('analytics/experienceAnalysis', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/analytics/employees/experience-analysis');
    return response.data.data.analytics;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch experience analysis');
  }
});

export const fetchEmployeeCounts = createAsyncThunk('analytics/counts', async (_, { rejectWithValue }) => {
  try {
    const [countRes, projectRes, taskRes, countryRes, verifiedRes] = await Promise.all([
      api.get('/stats/employees/count'),
      api.get('/stats/employees/project-count'),
      api.get('/stats/employees/task-count'),
      api.get('/stats/employees/country-count'),
      api.get('/stats/employees/verified-count'),
    ]);
    return {
      totalEmployees: countRes.data.data.count,
      totalProjects: projectRes.data.data.count,
      totalTasks: taskRes.data.data.count,
      countries: countryRes.data.data.stats,
      verifiedCount: verifiedRes.data.data.count,
    };
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch counts');
  }
});

const initialState = {
  stats: null,
  counts: null,
  skillDistribution: [],
  domainDistribution: [],
  countryAnalysis: [],
  experienceAnalysis: [],
  loading: false,
  error: null,
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    clearAnalytics: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStats.pending, (state) => { state.loading = true; })
      .addCase(fetchStats.fulfilled, (state, action) => { state.loading = false; state.stats = action.payload; })
      .addCase(fetchStats.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchSkillDistribution.fulfilled, (state, action) => { state.skillDistribution = action.payload; })
      .addCase(fetchDomainDistribution.fulfilled, (state, action) => { state.domainDistribution = action.payload; })
      .addCase(fetchCountryAnalysis.fulfilled, (state, action) => { state.countryAnalysis = action.payload; })
      .addCase(fetchExperienceAnalysis.fulfilled, (state, action) => { state.experienceAnalysis = action.payload; })
      .addCase(fetchEmployeeCounts.fulfilled, (state, action) => { state.counts = action.payload; });
  },
});

export const { clearAnalytics } = analyticsSlice.actions;
export default analyticsSlice.reducer;
