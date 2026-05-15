const Employee = require('../models/employee.model');

class StatsService {
  async getEmployeeCount() {
    return await Employee.countDocuments();
  }

  async getAverageExperience() {
    const stats = await Employee.aggregate([
      { $unwind: '$profile.projects' },
      { $unwind: '$profile.projects.tasks' },
      { $group: { _id: null, avgExp: { $avg: '$profile.projects.tasks.assignedTo.skills.experience.years' } } }
    ]);
    return stats[0]?.avgExp || 0;
  }

  async getTopExperience() {
    return await Employee.aggregate([
      { $unwind: '$profile.projects' },
      { $unwind: '$profile.projects.tasks' },
      { $sort: { 'profile.projects.tasks.assignedTo.skills.experience.years': -1 } },
      { $limit: 1 },
      { $project: { name: 1, employeeId: 1, experience: '$profile.projects.tasks.assignedTo.skills.experience.years' } }
    ]);
  }

  async getProjectCount() {
    const result = await Employee.aggregate([
      { $unwind: '$profile.projects' },
      { $group: { _id: '$profile.projects.name' } },
      { $count: 'total' }
    ]);
    return result[0]?.total || 0;
  }

  async getTaskCount() {
    const result = await Employee.aggregate([
      { $unwind: '$profile.projects' },
      { $unwind: '$profile.projects.tasks' },
      { $count: 'total' }
    ]);
    return result[0]?.total || 0;
  }

  async getCountryCount() {
    return await Employee.aggregate([
      { $group: { _id: '$profile.contact.address.location.country', count: { $sum: 1 } } }
    ]);
  }

  async getStateCount() {
    return await Employee.aggregate([
      { $group: { _id: '$profile.contact.address.location.state', count: { $sum: 1 } } }
    ]);
  }

  async getDomainCount() {
    return await Employee.aggregate([
      { $unwind: '$profile.projects' },
      { $unwind: '$profile.projects.tasks' },
      { $unwind: '$profile.projects.tasks.assignedTo.skills.experience.domains' },
      { $group: { _id: '$profile.projects.tasks.assignedTo.skills.experience.domains', count: { $sum: 1 } } }
    ]);
  }

  async getSkillCount() {
    return await Employee.aggregate([
      { $unwind: '$profile.projects' },
      { $unwind: '$profile.projects.tasks' },
      { $group: { _id: '$profile.projects.tasks.assignedTo.skills.primary', count: { $sum: 1 } } }
    ]);
  }

  async getCertificationCount() {
    return await Employee.aggregate([
      { $unwind: '$profile.projects' },
      { $unwind: '$profile.projects.tasks' },
      { $unwind: '$profile.projects.tasks.assignedTo.skills.experience.certifications.current' },
      { $group: { _id: '$profile.projects.tasks.assignedTo.skills.experience.certifications.current', count: { $sum: 1 } } }
    ]);
  }

  async getTimezoneCount() {
    return await Employee.aggregate([
      { $group: { _id: '$profile.contact.address.location.geo.timezone.name', count: { $sum: 1 } } }
    ]);
  }

  async getVerifiedCount() {
    return await Employee.countDocuments({ 'profile.projects.tasks.assignedTo.skills.experience.certifications.meta.verified': true });
  }

  async getProjectDistribution() {
    return await Employee.aggregate([
      { $unwind: '$profile.projects' },
      { $group: { _id: '$profile.projects.name', count: { $sum: 1 } } }
    ]);
  }

  async getTaskDistribution() {
    return await Employee.aggregate([
      { $unwind: '$profile.projects' },
      { $unwind: '$profile.projects.tasks' },
      { $group: { _id: '$profile.projects.tasks.description', count: { $sum: 1 } } }
    ]);
  }

  async getTechnologyCount() {
    return await Employee.aggregate([
      { $unwind: '$profile.projects' },
      { $unwind: '$profile.projects.tasks' },
      { $unwind: '$profile.projects.tasks.assignedTo.skills.secondary' },
      { $group: { _id: '$profile.projects.tasks.assignedTo.skills.secondary', count: { $sum: 1 } } }
    ]);
  }
}

module.exports = new StatsService();
