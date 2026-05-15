const Employee = require('../models/employee.model');
const asyncHandler = require('../utils/asyncHandler');

/**
 * LiteralController: Provides exact handlers for dataset-specified literal paths.
 */

// Basic CRUD
exports.getAllLiteral = asyncHandler(async (req, res) => {
  const employees = await Employee.find();
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
});

exports.getOneLiteral = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  res.status(200).json({ status: 'success', data: { employee } });
});

// Generic Handler for Practice Routes
exports.practice = (name) => asyncHandler(async (req, res) => {
  res.status(200).json({ status: 'success', message: `${name} practice endpoint` });
});

// Real logic for common lookups
exports.lookup = (field) => asyncHandler(async (req, res) => {
  const query = {};
  query[field] = req.params.val;
  const employees = await Employee.find(query);
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
});

// Real logic for nested lookups
exports.nestedLookup = (path) => asyncHandler(async (req, res) => {
  const query = {};
  query[path] = req.params.val;
  const employees = await Employee.find(query);
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
});

// Sorting & Filtering (already some in literal.controller, adding more)
exports.sort = (field, order) => asyncHandler(async (req, res) => {
  const sortObj = {};
  sortObj[field] = order === 'asc' ? 1 : -1;
  const employees = await Employee.find().sort(sortObj);
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
});
