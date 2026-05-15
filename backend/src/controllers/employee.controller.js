const employeeService = require('../services/employee.service');
const asyncHandler = require('../utils/asyncHandler');

exports.createEmployee = asyncHandler(async (req, res) => {
  const employee = await employeeService.createEmployee(req.body);
  res.status(201).json({
    status: 'success',
    data: { employee },
  });
});

exports.getEmployees = asyncHandler(async (req, res) => {
  const { employees, totalCount } = await employeeService.getAllEmployees(req.query);
  res.status(200).json({
    status: 'success',
    results: employees.length,
    total: totalCount,
    data: { employees },
  });
});

exports.getEmployee = asyncHandler(async (req, res) => {
  const employee = await employeeService.getEmployeeById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: { employee },
  });
});

exports.updateEmployee = asyncHandler(async (req, res) => {
  const employee = await employeeService.updateEmployee(req.params.id, req.body);
  res.status(200).json({
    status: 'success',
    data: { employee },
  });
});

exports.deleteEmployee = asyncHandler(async (req, res) => {
  await employeeService.deleteEmployee(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
