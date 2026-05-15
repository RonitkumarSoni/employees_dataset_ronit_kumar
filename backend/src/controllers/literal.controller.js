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

// --- Analytics Handlers ---
exports.getSkillDistribution = asyncHandler(async (req, res) => {
  const stats = await Employee.aggregate([
    { $unwind: '$profile.projects' },
    { $unwind: '$profile.projects.tasks' },
    { $group: { _id: '$profile.projects.tasks.assignedTo.skills.primary', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
  res.status(200).json({ status: 'success', data: { stats } });
});

exports.getCountryDistribution = asyncHandler(async (req, res) => {
  const stats = await Employee.aggregate([
    { $group: { _id: '$profile.contact.address.location.country', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
  res.status(200).json({ status: 'success', data: { stats } });
});

// --- Info Lookup Handlers ---
exports.getByName = asyncHandler(async (req, res) => {
  const employees = await Employee.find({ name: new RegExp(req.params.name, 'i') });
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
});

exports.getByState = asyncHandler(async (req, res) => {
  const employees = await Employee.find({ 'profile.contact.address.location.state': new RegExp(req.params.state, 'i') });
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
});

exports.getByCountry = asyncHandler(async (req, res) => {
  const employees = await Employee.find({ 'profile.contact.address.location.country': new RegExp(req.params.country, 'i') });
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
});

exports.getByCity = asyncHandler(async (req, res) => {
  const employees = await Employee.find({ 'profile.contact.address.location.city': new RegExp(req.params.city, 'i') });
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
});

exports.getByTimezone = asyncHandler(async (req, res) => {
  const employees = await Employee.find({ 'profile.contact.address.location.geo.timezone.name': req.params.timezone });
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
});

exports.getBySkill = asyncHandler(async (req, res) => {
  const employees = await Employee.find({ 'profile.projects.tasks.assignedTo.skills.primary': req.params.skill });
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
});

exports.getByExperience = asyncHandler(async (req, res) => {
  const employees = await Employee.find({ 'profile.projects.tasks.assignedTo.skills.experience.years': req.params.years });
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
});

exports.getByCertification = asyncHandler(async (req, res) => {
  const employees = await Employee.find({ 'profile.projects.tasks.assignedTo.skills.experience.certifications.current': req.params.certification });
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
});

// --- Placeholder for other literal routes ---
exports.genericLiteral = (message) => asyncHandler(async (req, res) => {
  res.status(200).json({ status: 'success', message });
});
