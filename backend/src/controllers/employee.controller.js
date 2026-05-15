const employeeService = require('../services/employee.service');
const asyncHandler = require('../utils/asyncHandler');

exports.createEmployee = asyncHandler(async (req, res) => {
  const employee = await employeeService.createEmployee(req.body);
  res.status(201).json({ status: 'success', data: { employee } });
});

exports.getEmployees = asyncHandler(async (req, res) => {
  const { employees, totalCount } = await employeeService.getAllEmployees(req.query);
  res.status(200).json({ status: 'success', results: employees.length, total: totalCount, data: { employees } });
});

exports.getEmployee = asyncHandler(async (req, res) => {
  const employee = await employeeService.getEmployeeById(req.params.id);
  res.status(200).json({ status: 'success', data: { employee } });
});

exports.updateEmployee = asyncHandler(async (req, res) => {
  const employee = await employeeService.updateEmployee(req.params.id, req.body);
  res.status(200).json({ status: 'success', data: { employee } });
});

exports.replaceEmployee = asyncHandler(async (req, res) => {
  const employee = await employeeService.replaceEmployee(req.params.id, req.body);
  res.status(200).json({ status: 'success', data: { employee } });
});

exports.deleteEmployee = asyncHandler(async (req, res) => {
  await employeeService.deleteEmployee(req.params.id);
  res.status(204).json({ status: 'success', data: null });
});

exports.checkExists = asyncHandler(async (req, res) => {
  const result = await employeeService.checkEmployeeExists(req.params.id);
  res.status(200).json({ status: 'success', data: result });
});

// Bulk Operations
exports.bulkCreate = asyncHandler(async (req, res) => {
  const employees = await employeeService.bulkCreate(req.body);
  res.status(201).json({ status: 'success', results: employees.length, data: { employees } });
});

exports.bulkUpdate = asyncHandler(async (req, res) => {
  const result = await employeeService.bulkUpdate(req.body);
  res.status(200).json({ status: 'success', data: result });
});

exports.bulkDelete = asyncHandler(async (req, res) => {
  const result = await employeeService.bulkDelete(req.body.ids);
  res.status(200).json({ status: 'success', data: result });
});

// Employee Information Routes
exports.getByName = asyncHandler(async (req, res) => {
  const employees = await employeeService.getByName(req.params.name);
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
});

exports.getByState = asyncHandler(async (req, res) => {
  const employees = await employeeService.getByState(req.params.state);
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
});

exports.getByCountry = asyncHandler(async (req, res) => {
  const employees = await employeeService.getByCountry(req.params.country);
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
});

exports.getByCity = asyncHandler(async (req, res) => {
  const employees = await employeeService.getByCity(req.params.city);
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
});

exports.getByTimezone = asyncHandler(async (req, res) => {
  const employees = await employeeService.getByTimezone(req.params.timezone);
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
});

exports.getByPrimarySkill = asyncHandler(async (req, res) => {
  const employees = await employeeService.getByPrimarySkill(req.params.skill);
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
});

exports.getBySecondarySkill = asyncHandler(async (req, res) => {
  const employees = await employeeService.getBySecondarySkill(req.params.skill);
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
});

exports.getByDomain = asyncHandler(async (req, res) => {
  const employees = await employeeService.getByDomain(req.params.domain);
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
});

exports.getByExperience = asyncHandler(async (req, res) => {
  const employees = await employeeService.getByExperience(req.params.years);
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
});

exports.getByCertification = asyncHandler(async (req, res) => {
  const employees = await employeeService.getByCertification(req.params.certification);
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
});

exports.getVerified = asyncHandler(async (req, res) => {
  const employees = await employeeService.getVerifiedEmployees();
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
});

exports.getProjects = asyncHandler(async (req, res) => {
  const employees = await employeeService.getAllProjects();
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
});

exports.getTasks = asyncHandler(async (req, res) => {
  const employees = await employeeService.getAllTasks();
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
});

exports.getTopExperience = asyncHandler(async (req, res) => {
  const data = await employeeService.getTopExperience();
  res.status(200).json({ status: 'success', results: data.length, data: { employees: data } });
});

exports.getTopSkills = asyncHandler(async (req, res) => {
  const data = await employeeService.getTopSkills();
  res.status(200).json({ status: 'success', results: data.length, data: { skills: data } });
});

exports.getCloudEngineers = asyncHandler(async (req, res) => {
  const employees = await employeeService.getByTechnologyRole('Cloud');
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
});

exports.getDevopsEngineers = asyncHandler(async (req, res) => {
  const employees = await employeeService.getByTechnologyRole('DevOps');
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
});

exports.getAiEngineers = asyncHandler(async (req, res) => {
  const employees = await employeeService.getByTechnologyRole('AI');
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
});

exports.getFullstack = asyncHandler(async (req, res) => {
  const employees = await employeeService.getByTechnologyRole('Full');
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
});

exports.getRecentCertifications = asyncHandler(async (req, res) => {
  const data = await employeeService.getRecentCertifications();
  res.status(200).json({ status: 'success', results: data.length, data: { employees: data } });
});
