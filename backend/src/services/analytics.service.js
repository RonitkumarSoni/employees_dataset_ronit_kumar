const Employee = require('../models/employee.model');

class AnalyticsService {
  async getGeneralStats() {
    const stats = await Employee.aggregate([
      { $group: { _id: null, totalEmployees: { $sum: 1 }, avgSalary: { $avg: '$salary' }, minSalary: { $min: '$salary' }, maxSalary: { $max: '$salary' } } },
    ]);
    return stats[0] || {};
  }

  async getSkillDistribution() {
    return await Employee.aggregate([
      { $unwind: '$profile.projects' },
      { $unwind: '$profile.projects.tasks' },
      { $group: { _id: '$profile.projects.tasks.assignedTo.skills.primary', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
  }

  async getCountryDistribution() {
    return await Employee.aggregate([
      { $group: { _id: '$profile.contact.address.location.country', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
  }

  async getStateDistribution() {
    return await Employee.aggregate([
      { $group: { _id: '$profile.contact.address.location.state', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
  }

  async getDomainDistribution() {
    return await Employee.aggregate([
      { $unwind: '$profile.projects' },
      { $unwind: '$profile.projects.tasks' },
      { $unwind: '$profile.projects.tasks.assignedTo.skills.experience.domains' },
      { $group: { _id: '$profile.projects.tasks.assignedTo.skills.experience.domains', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
  }

  async getCertificationAnalytics() {
    return await Employee.aggregate([
      { $unwind: '$profile.projects' },
      { $unwind: '$profile.projects.tasks' },
      { $unwind: '$profile.projects.tasks.assignedTo.skills.experience.certifications.current' },
      { $group: { _id: '$profile.projects.tasks.assignedTo.skills.experience.certifications.current', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
  }

  async getProjectAnalytics() {
    return await Employee.aggregate([
      { $unwind: '$profile.projects' },
      { $group: { _id: '$profile.projects.name', totalTasks: { $sum: { $size: '$profile.projects.tasks' } } } },
      { $sort: { totalTasks: -1 } },
    ]);
  }

  async getTechnologyAnalytics() {
    return await Employee.aggregate([
      { $unwind: '$profile.projects' },
      { $unwind: '$profile.projects.tasks' },
      { $unwind: '$profile.projects.tasks.assignedTo.skills.secondary' },
      { $group: { _id: '$profile.projects.tasks.assignedTo.skills.secondary', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
  }

  async getTimezoneAnalytics() {
    return await Employee.aggregate([
      { $group: { _id: '$profile.contact.address.location.geo.timezone.name', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
  }

  async getLocationAnalytics() {
    return await Employee.aggregate([
      { $group: { _id: { country: '$profile.contact.address.location.country', state: '$profile.contact.address.location.state' }, count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
  }

  async getExperienceAnalytics() {
    return await Employee.aggregate([
      { $unwind: '$profile.projects' },
      { $unwind: '$profile.projects.tasks' },
      {
        $bucket: {
          groupBy: '$profile.projects.tasks.assignedTo.skills.experience.years',
          boundaries: [0, 2, 5, 8, 12, 20],
          default: '20+',
          output: { count: { $sum: 1 } },
        },
      },
    ]);
  }

  async getVerificationAnalytics() {
    return await Employee.aggregate([
      { $unwind: '$profile.projects' },
      { $unwind: '$profile.projects.tasks' },
      { $group: { _id: '$profile.projects.tasks.assignedTo.skills.experience.certifications.meta.verified', count: { $sum: 1 } } },
    ]);
  }

  async getTaskAnalytics() {
    return await Employee.aggregate([
      { $unwind: '$profile.projects' },
      { $unwind: '$profile.projects.tasks' },
      { $group: { _id: '$profile.projects.tasks.description', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 20 },
    ]);
  }
}

module.exports = new AnalyticsService();
