const Employee = require('../models/employee.model');

class AnalyticsService {
  async getSkillDistribution() {
    return await Employee.aggregate([
      { $unwind: '$profile.projects' },
      { $unwind: '$profile.projects.tasks' },
      {
        $group: {
          _id: '$profile.projects.tasks.assignedTo.skills.primary',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);
  }

  async getCountryDistribution() {
    return await Employee.aggregate([
      {
        $group: {
          _id: '$profile.contact.address.location.country',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);
  }

  async getDomainStats() {
    return await Employee.aggregate([
      { $unwind: '$profile.projects' },
      { $unwind: '$profile.projects.tasks' },
      {
        $group: {
          _id: '$profile.projects.tasks.assignedTo.skills.experience.domains',
          avgExperience: { $avg: '$profile.projects.tasks.assignedTo.skills.experience.years' },
          count: { $sum: 1 },
        },
      },
      { $unwind: '$_id' },
      {
        $group: {
          _id: '$_id',
          avgExperience: { $avg: '$avgExperience' },
          totalEmployees: { $sum: 1 }
        }
      },
      { $sort: { totalEmployees: -1 } }
    ]);
  }

  async getGeneralStats() {
    const stats = await Employee.aggregate([
      {
        $group: {
          _id: null,
          totalEmployees: { $sum: 1 },
          avgSalary: { $avg: '$salary' },
          minSalary: { $min: '$salary' },
          maxSalary: { $max: '$salary' },
        },
      },
    ]);
    return stats[0] || {};
  }
}

module.exports = new AnalyticsService();
