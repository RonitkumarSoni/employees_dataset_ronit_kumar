import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchEmployeeCounts, fetchSkillDistribution, fetchCountryAnalysis } from '../features/analytics/analyticsSlice';
import { fetchEmployees } from '../features/employees/employeeSlice';
import StatsCard from '../components/dashboard/StatsCard';
import ChartCard from '../components/dashboard/ChartCard';
import RecentEmployees from '../components/dashboard/RecentEmployees';
import ErrorState from '../components/common/ErrorState';
import SEO from '../components/common/SEO';
import { StatsSkeleton, ChartSkeleton } from '../components/common/LoadingSkeleton';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#6366f1', '#4f46e5', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#8b5cf6'];

const Dashboard = () => {
  const dispatch = useDispatch();
  const { counts, skillDistribution, countryAnalysis, loading, error } = useSelector((state) => state.analytics);
  const { list: employees, loading: empLoading } = useSelector((state) => state.employees);
  const { user } = useSelector((state) => state.auth);

  const isAdmin = user?.role === 'admin';

  const loadData = () => {
    // Only admins can request the aggregation-based analytics APIs
    if (isAdmin) {
      dispatch(fetchEmployeeCounts());
      dispatch(fetchSkillDistribution());
      dispatch(fetchCountryAnalysis());
    }
    // Fetch recent joiners (all roles can fetch employees)
    dispatch(fetchEmployees({ limit: 5, sort: '-joiningDate' }));
  };

  useEffect(() => {
    loadData();
  }, [dispatch, isAdmin]);

  if (error && isAdmin) {
    return (
      <div className="py-6">
        <ErrorState onRetry={loadData} message={error} />
      </div>
    );
  }

  // Format Recharts data safely
  const skillChartData = skillDistribution
    ? skillDistribution.slice(0, 6).map((item) => ({
        name: item._id || 'Unknown',
        value: item.count || 0,
      }))
    : [];

  const countryChartData = countryAnalysis
    ? countryAnalysis.slice(0, 5).map((item) => ({
        name: item._id || 'N/A',
        value: item.count || 0,
      }))
    : [];

  const verifiedPercent = counts?.totalEmployees
    ? Math.round((counts.verifiedCount / counts.totalEmployees) * 100)
    : 0;

  return (
    <>
      <SEO
        title="Admin Dashboard"
        description="Aegis Employee Management Analytics dashboard showing key metrics, skill sets, and geographic distributions."
      />
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-dark-text tracking-tight">
              Hello, {user?.name || 'Admin'}
            </h1>
            <p className="text-sm text-gray-500 dark:text-dark-muted">
              Here is what's happening across your workforce directory.
            </p>
          </div>
        </div>

        {/* Admin Analytical Stats Section */}
        {isAdmin ? (
          loading || !counts ? (
            <StatsSkeleton />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total Employees"
                value={counts.totalEmployees}
                icon={<PeopleAltOutlinedIcon />}
                description="Registered in directory"
                trend="+4%"
                trendType="up"
              />
              <StatsCard
                title="Active Projects"
                value={counts.totalProjects}
                icon={<AssignmentOutlinedIcon />}
                description="Currently assigned"
                trend="+2"
                trendType="up"
              />
              <StatsCard
                title="Tasks Logged"
                value={counts.totalTasks}
                icon={<TaskAltOutlinedIcon />}
                description="Across all projects"
                trend="Stable"
                trendType="neutral"
              />
              <StatsCard
                title="Verified Staff"
                value={`${verifiedPercent}%`}
                icon={<VerifiedUserOutlinedIcon />}
                description={`${counts.verifiedCount} verified profiles`}
                trend="+5%"
                trendType="up"
              />
            </div>
          )
        ) : (
          /* Non-admin / Regular User welcome banner */
          <div className="bg-white dark:bg-dark-card border border-gray-200/50 dark:border-dark-border/50 rounded-2xl p-6 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 dark:text-dark-text mb-1">
              Welcome to the Directory
            </h3>
            <p className="text-sm text-gray-500 dark:text-dark-muted">
              You are signed in as a regular team member. Feel free to search and view the employee directory. Administrative metrics are hidden.
            </p>
          </div>
        )}

        {/* Charts & Listings */}
        {isAdmin && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Primary Skill Distribution Bar Chart */}
            <div className="lg:col-span-2">
              {loading ? (
                <ChartSkeleton />
              ) : (
                <ChartCard title="Primary Skills" subtitle="Distribution of primary skills across departments">
                  {skillChartData.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-gray-400">No skill data available</div>
                  ) : (
                    <ResponsiveContainer width="100%" height={240}>
                      <BarChart data={skillChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                            fontSize: '12px',
                            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
                          }}
                          cursor={{
                            fill: 'rgba(255, 255, 255, 0.05)',
                            radius: [6, 6, 0, 0]
                          }}
                        />
                        <Bar dataKey="value" fill="#4f46e5" radius={[6, 6, 0, 0]} maxBarSize={45}>
                          {skillChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </ChartCard>
              )}
            </div>

            {/* Country Share Pie Chart */}
            <div>
              {loading ? (
                <ChartSkeleton />
              ) : (
                <ChartCard title="Geographic Spread" subtitle="Top countries by employee presence">
                  {countryChartData.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-gray-400">No geographic data</div>
                  ) : (
                    <ResponsiveContainer width="100%" height={240}>
                      <PieChart>
                        <Pie
                          data={countryChartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={4}
                          dataKey="value"
                        >
                          {countryChartData.map((entry, index) => (
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
                            fontSize: '12px',
                            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                  {/* Legend below */}
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                    {countryChartData.map((item, idx) => (
                      <div key={item.name} className="flex items-center gap-1.5 min-w-0">
                        <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                        <span className="text-gray-600 dark:text-gray-400 truncate">{item.name} ({item.value})</span>
                      </div>
                    ))}
                  </div>
                </ChartCard>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* New Joiners Widget */}
          <div className="lg:col-span-1">
            <RecentEmployees employees={employees} loading={empLoading} />
          </div>

          {/* Quick Shortcuts / Guide */}
          <div className="lg:col-span-2 bg-gradient-to-br from-primary-500 to-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-lg shadow-primary-500/10 flex flex-col justify-between">
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10 blur-xl"></div>
            
            <div className="relative z-10 max-w-lg">
              <span className="text-xs font-bold uppercase tracking-wider bg-white/20 border border-white/20 px-3 py-1 rounded-full">
                Quick Guide
              </span>
              <h2 className="text-2xl font-black tracking-tight mt-4 mb-2">
                Manage Directory Records Effortlessly
              </h2>
              <p className="text-white/80 text-sm leading-relaxed mb-6">
                You can create, update, or remove employee records directly in the Employees page. Make sure you filter and search by name, department, or country using the search bar!
              </p>
            </div>

            <div className="relative z-10">
              <Link
                to="/employees"
                className="inline-flex items-center justify-center bg-white text-primary-700 font-bold px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 active:scale-95 text-sm"
              >
                Go to Directory
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
