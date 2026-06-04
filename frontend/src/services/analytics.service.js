import api from './api';

const getStats = async () => {
  const response = await api.get('/analytics/stats');
  return response.data.data.stats;
};

const getSkillDistribution = async () => {
  const response = await api.get('/analytics/employees/skill-distribution');
  return response.data.data.distribution;
};

const getDomainDistribution = async () => {
  const response = await api.get('/analytics/employees/domain-distribution');
  return response.data.data.distribution;
};

const getCountryAnalysis = async () => {
  const response = await api.get('/analytics/employees/country-analysis');
  return response.data.data.distribution;
};

const getExperienceAnalysis = async () => {
  const response = await api.get('/analytics/employees/experience-analysis');
  return response.data.data.analytics;
};

const getEmployeeCounts = async () => {
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
};

export default {
  getStats,
  getSkillDistribution,
  getDomainDistribution,
  getCountryAnalysis,
  getExperienceAnalysis,
  getEmployeeCounts,
};
