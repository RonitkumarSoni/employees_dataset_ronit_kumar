const Employee = require('../models/employee.model');
const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc    Search employees by keyword
 * @route   GET /api/search/employees?q=keyword
 * @access  Private
 */
exports.searchEmployees = asyncHandler(async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ status: 'fail', message: 'Search query (q) is required' });
  }

  const employees = await Employee.find({
    $or: [
      { name: { $regex: q, $options: 'i' } },
      { employeeId: { $regex: q, $options: 'i' } },
      { 'profile.contact.email': { $regex: q, $options: 'i' } },
      { 'profile.contact.address.location.country': { $regex: q, $options: 'i' } },
      { 'profile.contact.address.location.state': { $regex: q, $options: 'i' } },
      { 'profile.contact.address.location.city': { $regex: q, $options: 'i' } },
      { 'profile.projects.tasks.assignedTo.skills.primary': { $regex: q, $options: 'i' } },
      { 'profile.projects.tasks.assignedTo.skills.secondary': { $regex: q, $options: 'i' } },
      { 'profile.projects.tasks.assignedTo.skills.experience.domains': { $regex: q, $options: 'i' } },
      { 'profile.projects.tasks.assignedTo.skills.experience.certifications.current': { $regex: q, $options: 'i' } },
      { 'profile.projects.name': { $regex: q, $options: 'i' } },
      { 'profile.projects.tasks.description': { $regex: q, $options: 'i' } },
    ],
  });

  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
});

/**
 * Filter Routes
 */
exports.filterHighExperience = asyncHandler(async (req, res) => {
  const employees = await Employee.find({ 'profile.projects.tasks.assignedTo.skills.experience.years': { $gte: 8 } });
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
});

exports.filterLowExperience = asyncHandler(async (req, res) => {
  const employees = await Employee.find({ 'profile.projects.tasks.assignedTo.skills.experience.years': { $lte: 3 } });
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
});

exports.filterVerified = asyncHandler(async (req, res) => {
  const employees = await Employee.find({ 'profile.projects.tasks.assignedTo.skills.experience.certifications.meta.verified': true });
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
});

exports.filterByDomainKeyword = asyncHandler(async (req, res) => {
  const { domain } = req.params;
  const employees = await Employee.find({
    'profile.projects.tasks.assignedTo.skills.experience.domains': { $regex: domain, $options: 'i' },
  });
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
});

exports.filterBySkillKeyword = asyncHandler(async (req, res) => {
  const { skill } = req.params;
  const employees = await Employee.find({
    $or: [
      { 'profile.projects.tasks.assignedTo.skills.primary': { $regex: skill, $options: 'i' } },
      { 'profile.projects.tasks.assignedTo.skills.secondary': { $regex: skill, $options: 'i' } },
    ],
  });
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
});

exports.filterRecentCertifications = asyncHandler(async (req, res) => {
  const employees = await Employee.aggregate([
    { $unwind: '$profile.projects' },
    { $unwind: '$profile.projects.tasks' },
    { $match: { 'profile.projects.tasks.assignedTo.skills.experience.certifications.meta.verified': true } },
    { $sort: { 'profile.projects.tasks.assignedTo.skills.experience.certifications.meta.lastUpdated': -1 } },
    { $limit: 20 },
    { $project: { name: 1, employeeId: 1, certifications: '$profile.projects.tasks.assignedTo.skills.experience.certifications' } },
  ]);
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
});
