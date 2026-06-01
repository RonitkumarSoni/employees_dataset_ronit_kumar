const express = require('express');
const { protect, restrictTo } = require('../middlewares/auth.middleware');
const asyncHandler = require('../utils/asyncHandler');
const Employee = require('../models/employee.model');

const router = express.Router();

// All protected routes require authentication
router.use(protect);

/**
 * @desc    Protected route to add employee records
 * @route   POST /api/protected/employees
 */
router.post('/employees', restrictTo('admin'), asyncHandler(async (req, res) => {
  const employee = await Employee.create(req.body);
  res.status(201).json({ status: 'success', data: { employee } });
}));

/**
 * @desc    Protected route to update employee records
 * @route   PATCH /api/protected/employees/:id
 */
router.patch('/employees/:id', restrictTo('admin'), asyncHandler(async (req, res) => {
  const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!employee) return res.status(404).json({ status: 'fail', message: 'Employee not found' });
  res.status(200).json({ status: 'success', data: { employee } });
}));

/**
 * @desc    Protected route to delete employee records
 * @route   DELETE /api/protected/employees/:id
 */
router.delete('/employees/:id', restrictTo('admin'), asyncHandler(async (req, res) => {
  const employee = await Employee.findByIdAndDelete(req.params.id);
  if (!employee) return res.status(404).json({ status: 'fail', message: 'Employee not found' });
  res.status(204).json({ status: 'success', data: null });
}));

/**
 * @desc    Protected route to create project records
 * @route   POST /api/protected/projects
 */
router.post('/projects', restrictTo('admin'), asyncHandler(async (req, res) => {
  res.status(201).json({ status: 'success', message: 'Project created', data: req.body });
}));

/**
 * @desc    Protected route to update projects
 * @route   PATCH /api/protected/projects/:projectId
 */
router.patch('/projects/:projectId', restrictTo('admin'), asyncHandler(async (req, res) => {
  res.status(200).json({ status: 'success', message: `Project ${req.params.projectId} updated`, data: req.body });
}));

/**
 * @desc    Protected route to delete projects
 * @route   DELETE /api/protected/projects/:projectId
 */
router.delete('/projects/:projectId', restrictTo('admin'), asyncHandler(async (req, res) => {
  res.status(204).json({ status: 'success', data: null });
}));

module.exports = router;
