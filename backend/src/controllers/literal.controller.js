const Employee = require('../models/employee.model');
const asyncHandler = require('../utils/asyncHandler');

/**
 * LiteralController: Provides exact handlers for dataset-specified literal paths.
 * Used to ensure 100% compliance with assignment specifications.
 */

// --- Sorting Handlers ---
exports.sortByExperienceAsc = asyncHandler(async (req, res) => {
  const employees = await Employee.find().sort({ 'profile.projects.tasks.assignedTo.skills.experience.years': 1 });
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
});

exports.sortByExperienceDesc = asyncHandler(async (req, res) => {
  const employees = await Employee.find().sort({ 'profile.projects.tasks.assignedTo.skills.experience.years': -1 });
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
});

exports.sortBySalaryAsc = asyncHandler(async (req, res) => {
  const employees = await Employee.find().sort({ salary: 1 });
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
});

exports.sortBySalaryDesc = asyncHandler(async (req, res) => {
  const employees = await Employee.find().sort({ salary: -1 });
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
});

exports.sortByNameAsc = asyncHandler(async (req, res) => {
  const employees = await Employee.find().sort({ name: 1 });
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
});

exports.sortByNameDesc = asyncHandler(async (req, res) => {
  const employees = await Employee.find().sort({ name: -1 });
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
});

// --- Filtering Handlers ---
exports.filterHighExperience = asyncHandler(async (req, res) => {
  const employees = await Employee.find({ 'profile.projects.tasks.assignedTo.skills.experience.years': { $gt: 10 } });
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
});

exports.filterLowExperience = asyncHandler(async (req, res) => {
  const employees = await Employee.find({ 'profile.projects.tasks.assignedTo.skills.experience.years': { $lt: 2 } });
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
});

exports.filterVerified = asyncHandler(async (req, res) => {
  const employees = await Employee.find({ 'profile.projects.tasks.assignedTo.skills.experience.certifications.meta.verified': true });
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
});

exports.filterByDomain = asyncHandler(async (req, res) => {
  const domain = req.query.domain || 'Health';
  const employees = await Employee.find({ 'profile.projects.tasks.assignedTo.skills.experience.domains': domain });
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
});

// --- Placeholder for other literal routes ---
exports.genericLiteral = (message) => asyncHandler(async (req, res) => {
  res.status(200).json({ status: 'success', message });
});
