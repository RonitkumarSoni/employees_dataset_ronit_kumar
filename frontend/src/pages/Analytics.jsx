import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchStats,
  fetchSkillDistribution,
  fetchDomainDistribution,
  fetchCountryAnalysis,
  fetchExperienceAnalysis,
} from '../features/analytics/analyticsSlice';
import SEO from '../components/common/SEO';
import ChartCard from '../components/dashboard/ChartCard';
import ErrorState from '../components/common/ErrorState';
import { ChartSkeleton, StatsSkeleton } from '../components/common/LoadingSkeleton';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  CartesianGrid,
} from 'recharts';

const COLORS = ['#6366f1', '#4f46e5', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#8b5cf6'];

const Analytics = () => {
  const dispatch = useDispatch();
  const {
    stats,
    skillDistribution,
    domainDistribution,
    countryAnalysis,
    experienceAnalysis,
    loading,
    error,
  } = useSelector((state) => state.analytics);

  const loadData = () => {
    dispatch(fetchStats());
    dispatch(fetchSkillDistribution());
    dispatch(fetchDomainDistribution());
    dispatch(fetchCountryAnalysis());
    dispatch(fetchExperienceAnalysis());
  };

  useEffect(() => {
    loadData();
  }, [dispatch]);

  if (error) {
    return (
      <div className="py-6">
        <ErrorState onRetry={loadData} message={error} />
      </div>
    );
  }

  // Format Recharts Data
  const formatSkillData = skillDistribution?.slice(0, 8).map((item) => ({
    name: item._id || 'Unknown',
    count: item.count || 0,
  })) || [];

  const formatDomainData = domainDistribution?.slice(0, 6).map((item) => ({
    name: item._id || 'N/A',
    value: item.count || 0,
  })) || [];

  const formatCountryData = countryAnalysis?.slice(0, 6).map((item) => ({
    name: item._id || 'N/A',
    count: item.count || 0,
  })) || [];

  const getBucketLabel = (id) => {
    if (id === 0) return '0-2 yrs';
    if (id === 2) return '2-5 yrs';
    if (id === 5) return '5-8 yrs';
    if (id === 8) return '8-12 yrs';
    if (id === 12) return '12-20 yrs';
    if (id === '20+') return '20+ yrs';
    return `${id}+ yrs`;
  };

  const formatExperienceData = experienceAnalysis?.map((item) => ({
    range: getBucketLabel(item._id),
    count: item.count || 0,
  })) || [];

  return (
    <>
      <SEO
        title="Analytics Reports"
        description="Aegis Employee Management deep reporting tools. Analytics on salaries, skills, domains, and demographics."
      />
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-dark-text tracking-tight">
            Analytics & Reports
          </h1>
          <p className="text-sm text-gray-500 dark:text-dark-muted">
            Aggregated intelligence gathered from your MongoDB employee directory.
          </p>
        </div>

        {/* General Stats & Salaries */}
        {loading || !stats ? (
          <StatsSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-dark-card border border-gray-200/50 dark:border-dark-border/50 rounded-2xl p-6 shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold text-gray-500 dark:text-dark-muted">Staff Size</p>
                  <h3 className="text-3xl font-extrabold text-gray-900 dark:text-dark-text mt-2 mb-1">
                    {stats.totalEmployees || 0}
                  </h3>
                </div>
                <div className="w-12 h-12 bg-primary-50 dark:bg-primary-950/20 text-primary-500 rounded-xl flex items-center justify-center">
                  <PeopleAltOutlinedIcon />
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-dark-muted mt-4">Total profiles aggregated</p>
            </div>

            <div className="bg-white dark:bg-dark-card border border-gray-200/50 dark:border-dark-border/50 rounded-2xl p-6 shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold text-gray-500 dark:text-dark-muted">Average Salary</p>
                  <h3 className="text-3xl font-extrabold text-gray-900 dark:text-dark-text mt-2 mb-1">
                    ${Math.round(stats.avgSalary || 0).toLocaleString()}
                  </h3>
                </div>
                <div className="w-12 h-12 bg-green-50 dark:bg-green-950/20 text-green-500 rounded-xl flex items-center justify-center">
                  <AccountBalanceWalletIcon />
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-dark-muted mt-4">Across all departments</p>
            </div>

            <div className="bg-white dark:bg-dark-card border border-gray-200/50 dark:border-dark-border/50 rounded-2xl p-6 shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold text-gray-500 dark:text-dark-muted">Max Salary</p>
                  <h3 className="text-3xl font-extrabold text-gray-900 dark:text-dark-text mt-2 mb-1">
                    ${(stats.maxSalary || 0).toLocaleString()}
                  </h3>
                </div>
                <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 rounded-xl flex items-center justify-center">
                  <TrendingUpIcon />
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-dark-muted mt-4">Highest compensation package</p>
            </div>

            <div className="bg-white dark:bg-dark-card border border-gray-200/50 dark:border-dark-border/50 rounded-2xl p-6 shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold text-gray-500 dark:text-dark-muted">Min Salary</p>
                  <h3 className="text-3xl font-extrabold text-gray-900 dark:text-dark-text mt-2 mb-1">
                    ${(stats.minSalary || 0).toLocaleString()}
                  </h3>
                </div>
                <div className="w-12 h-12 bg-amber-50 dark:bg-amber-950/20 text-amber-500 rounded-xl flex items-center justify-center">
                  <TrendingDownIcon />
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-dark-muted mt-4">Lowest base salary rate</p>
            </div>
          </div>
        )}

        {/* Charts Grids */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Primary Skills Chart */}
          <div>
            {loading ? (
              <ChartSkeleton />
            ) : (
              <ChartCard title="Primary Skills Distribution" subtitle="Headcounts sorted by key languages/frameworks">
                {formatSkillData.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-gray-400">No skill data</div>
                ) : (
                  <ResponsiveContainer width="100%" height={240}>
                    <BarChart data={formatSkillData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} allowDecimals={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(15, 23, 42, 0.75)',
                          backdropFilter: 'blur(8px)',
                          WebkitBackdropFilter: 'blur(8px)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '12px',
                          color: '#fff',
                          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
                        }}
                        cursor={{
                          fill: 'rgba(255, 255, 255, 0.05)',
                          radius: [4, 4, 0, 0]
                        }}
                      />
                      <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} maxBarSize={45}>
                        {formatSkillData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </ChartCard>
            )}
          </div>

          {/* Domain Knowledge Chart */}
          <div>
            {loading ? (
              <ChartSkeleton />
            ) : (
              <ChartCard title="Domains Knowledge Distribution" subtitle="Breakdown of experience fields">
                {formatDomainData.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-gray-400">No domain data</div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <ResponsiveContainer width="100%" height={240} className="max-w-[200px]">
                      <PieChart>
                        <Pie
                          data={formatDomainData}
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={75}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {formatDomainData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(15, 23, 42, 0.75)',
                            backdropFilter: 'blur(8px)',
                            WebkitBackdropFilter: 'blur(8px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '12px',
                            color: '#fff',
                            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="grid grid-cols-2 gap-2 text-xs flex-1 max-w-[250px]">
                      {formatDomainData.map((item, idx) => (
                        <div key={item.name} className="flex items-center gap-2 min-w-0">
                          <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                          <span className="text-gray-600 dark:text-gray-400 truncate">{item.name} ({item.value})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </ChartCard>
            )}
          </div>

          {/* Experience Buckets */}
          <div>
            {loading ? (
              <ChartSkeleton />
            ) : (
              <ChartCard title="Experience Distribution" subtitle="Count of staff grouped by years of experience">
                {formatExperienceData.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-gray-400">No experience statistics</div>
                ) : (
                  <ResponsiveContainer width="100%" height={240}>
                    <AreaChart data={formatExperienceData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.15)" />
                      <XAxis dataKey="range" stroke="#94a3b8" fontSize={11} tickLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} allowDecimals={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(15, 23, 42, 0.75)',
                          backdropFilter: 'blur(8px)',
                          WebkitBackdropFilter: 'blur(8px)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '12px',
                          color: '#fff',
                          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
                        }}
                        cursor={{
                          stroke: 'rgba(255, 255, 255, 0.2)',
                          strokeWidth: 1,
                          strokeDasharray: '4 4'
                        }}
                      />
                      <Area type="monotone" dataKey="count" stroke="#6366f1" fillOpacity={0.15} fill="url(#colorCount)" strokeWidth={2} />
                      <defs>
                        <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </ChartCard>
            )}
          </div>

          {/* Geographic presences */}
          <div>
            {loading ? (
              <ChartSkeleton />
            ) : (
              <ChartCard title="Geographic Presence" subtitle="Country spreads for global employees">
                {formatCountryData.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-gray-400">No country data</div>
                ) : (
                  <ResponsiveContainer width="100%" height={240}>
                    <BarChart data={formatCountryData} layout="vertical" margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                      <XAxis type="number" stroke="#94a3b8" fontSize={11} tickLine={false} allowDecimals={false} />
                      <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={11} tickLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(15, 23, 42, 0.75)',
                          backdropFilter: 'blur(8px)',
                          WebkitBackdropFilter: 'blur(8px)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '12px',
                          color: '#fff',
                          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
                        }}
                        cursor={{
                          fill: 'rgba(255, 255, 255, 0.05)',
                          radius: [4, 4, 0, 0]
                        }}
                      />
                      <Bar dataKey="count" fill="#4f46e5" radius={[0, 4, 4, 0]} maxBarSize={20}>
                        {formatCountryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </ChartCard>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
