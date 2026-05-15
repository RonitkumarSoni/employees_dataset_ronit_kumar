const Employee = require('../models/employee.model');
const APIFeatures = require('../utils/apiFeatures');

class EmployeeService {
  async createEmployee(employeeData) {
    const employee = await Employee.create(employeeData);
    return employee;
  }

  async getAllEmployees(queryStr) {
    const features = new APIFeatures(Employee.find(), queryStr)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const employees = await features.query;
    const totalCount = await Employee.countDocuments();

    return { employees, totalCount };
  }

  async getEmployeeById(id) {
    const employee = await Employee.findById(id);
    if (!employee) {
      const error = new Error('Employee not found');
      error.statusCode = 404;
      throw error;
    }
    return employee;
  }

  async updateEmployee(id, updateData) {
    const employee = await Employee.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!employee) {
      const error = new Error('Employee not found');
      error.statusCode = 404;
      throw error;
    }
    return employee;
  }

  async replaceEmployee(id, replaceData) {
    const employee = await Employee.findOneAndReplace({ _id: id }, replaceData, {
      new: true,
      runValidators: true,
    });
    if (!employee) {
      const error = new Error('Employee not found');
      error.statusCode = 404;
      throw error;
    }
    return employee;
  }

  async deleteEmployee(id) {
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      const error = new Error('Employee not found');
      error.statusCode = 404;
      throw error;
    }
    return employee;
  }

  async checkEmployeeExists(employeeId) {
    const employee = await Employee.findOne({ employeeId });
    return { exists: !!employee };
  }

  // Bulk Operations
  async bulkCreate(employeesData) {
    const employees = await Employee.insertMany(employeesData);
    return employees;
  }

  async bulkUpdate(updates) {
    const bulkOps = updates.map((item) => ({
      updateOne: {
        filter: { _id: item.id },
        update: { $set: item.data },
      },
    }));
    const result = await Employee.bulkWrite(bulkOps);
    return result;
  }

  async bulkDelete(ids) {
    const result = await Employee.deleteMany({ _id: { $in: ids } });
    return result;
  }

  // Employee Information Routes
  async getByName(name) {
    return await Employee.find({ name: { $regex: name, $options: 'i' } });
  }

  async getByState(state) {
    return await Employee.find({ 'profile.contact.address.location.state': { $regex: state, $options: 'i' } });
  }

  async getByCountry(country) {
    return await Employee.find({ 'profile.contact.address.location.country': { $regex: country, $options: 'i' } });
  }

  async getByCity(city) {
    return await Employee.find({ 'profile.contact.address.location.city': { $regex: city, $options: 'i' } });
  }

  async getByTimezone(timezone) {
    return await Employee.find({ 'profile.contact.address.location.geo.timezone.name': { $regex: timezone, $options: 'i' } });
  }

  async getByPrimarySkill(skill) {
    return await Employee.find({ 'profile.projects.tasks.assignedTo.skills.primary': { $regex: skill, $options: 'i' } });
  }

  async getBySecondarySkill(skill) {
    return await Employee.find({ 'profile.projects.tasks.assignedTo.skills.secondary': { $regex: skill, $options: 'i' } });
  }

  async getByDomain(domain) {
    return await Employee.find({ 'profile.projects.tasks.assignedTo.skills.experience.domains': { $regex: domain, $options: 'i' } });
  }

  async getByExperience(years) {
    return await Employee.find({ 'profile.projects.tasks.assignedTo.skills.experience.years': Number(years) });
  }

  async getByCertification(certification) {
    return await Employee.find({ 'profile.projects.tasks.assignedTo.skills.experience.certifications.current': { $regex: certification, $options: 'i' } });
  }

  async getVerifiedEmployees() {
    return await Employee.find({ 'profile.projects.tasks.assignedTo.skills.experience.certifications.meta.verified': true });
  }

  async getAllProjects() {
    return await Employee.find({}, { 'profile.projects': 1, name: 1, employeeId: 1 });
  }

  async getAllTasks() {
    return await Employee.find({}, { 'profile.projects.tasks': 1, name: 1, employeeId: 1 });
  }

  async getTopExperience() {
    return await Employee.aggregate([
      { $unwind: '$profile.projects' },
      { $unwind: '$profile.projects.tasks' },
      { $sort: { 'profile.projects.tasks.assignedTo.skills.experience.years': -1 } },
      { $limit: 10 },
      { $project: { name: 1, employeeId: 1, experience: '$profile.projects.tasks.assignedTo.skills.experience.years' } },
    ]);
  }

  async getTopSkills() {
    return await Employee.aggregate([
      { $unwind: '$profile.projects' },
      { $unwind: '$profile.projects.tasks' },
      { $group: { _id: '$profile.projects.tasks.assignedTo.skills.primary', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);
  }

  async getByTechnologyRole(keyword) {
    return await Employee.find({
      $or: [
        { 'profile.projects.tasks.assignedTo.skills.primary': { $regex: keyword, $options: 'i' } },
        { 'profile.projects.tasks.assignedTo.skills.secondary': { $regex: keyword, $options: 'i' } },
        { 'profile.projects.tasks.assignedTo.skills.experience.domains': { $regex: keyword, $options: 'i' } },
      ],
    });
  }

  async getRecentCertifications() {
    return await Employee.aggregate([
      { $unwind: '$profile.projects' },
      { $unwind: '$profile.projects.tasks' },
      { $sort: { 'profile.projects.tasks.assignedTo.skills.experience.certifications.meta.lastUpdated': -1 } },
      { $limit: 10 },
      {
        $project: {
          name: 1,
          employeeId: 1,
          certifications: '$profile.projects.tasks.assignedTo.skills.experience.certifications',
        },
      },
    ]);
  }
}

module.exports = new EmployeeService();
