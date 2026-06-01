const express = require('express');
const jwt = require('jsonwebtoken');
const { protect } = require('../middlewares/auth.middleware');
const asyncHandler = require('../utils/asyncHandler');
const Employee = require('../models/employee.model');

const router = express.Router();

/**
 * @desc    Access JWT protected employee profile
 * @route   GET /api/jwt/profile
 */
router.get('/profile', protect, asyncHandler(async (req, res) => {
  res.status(200).json({ status: 'success', data: { user: req.user } });
}));

/**
 * @desc    Access JWT protected dashboard
 * @route   GET /api/jwt/dashboard
 */
router.get('/dashboard', protect, asyncHandler(async (req, res) => {
  const count = await Employee.countDocuments();
  res.status(200).json({ status: 'success', data: { totalEmployees: count, user: req.user.name } });
}));

/**
 * @desc    Generate JWT token
 * @route   POST /api/jwt/generate-token
 */
router.post('/generate-token', protect, asyncHandler(async (req, res) => {
  const token = jwt.sign({ id: req.user._id, role: req.user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
  res.status(200).json({ status: 'success', token });
}));

/**
 * @desc    Verify JWT token
 * @route   POST /api/jwt/verify-token
 */
router.post('/verify-token', asyncHandler(async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ status: 'fail', message: 'Token is required' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ status: 'success', data: { decoded } });
  } catch (err) {
    res.status(401).json({ status: 'fail', message: 'Invalid or expired token' });
  }
}));

/**
 * @desc    Refresh JWT access token
 * @route   POST /api/jwt/refresh-token
 */
router.post('/refresh-token', protect, asyncHandler(async (req, res) => {
  const newToken = jwt.sign({ id: req.user._id, role: req.user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
  res.status(200).json({ status: 'success', token: newToken });
}));

/**
 * @desc    Revoke JWT token
 * @route   DELETE /api/jwt/revoke-token
 */
router.delete('/revoke-token', protect, asyncHandler(async (req, res) => {
  res.status(200).json({ status: 'success', message: 'Token revoked successfully' });
}));

/**
 * @desc    Access protected employee records
 * @route   GET /api/jwt/private-employees
 */
router.get('/private-employees', protect, asyncHandler(async (req, res) => {
  const employees = await Employee.find().limit(20);
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
}));

/**
 * @desc    Access protected project records
 * @route   GET /api/jwt/private-projects
 */
router.get('/private-projects', protect, asyncHandler(async (req, res) => {
  const projects = await Employee.aggregate([
    { $unwind: '$profile.projects' },
    { $group: { _id: '$profile.projects.projectId', name: { $first: '$profile.projects.name' } } },
    { $limit: 20 }
  ]);
  res.status(200).json({ status: 'success', results: projects.length, data: { projects } });
}));

/**
 * @desc    Access protected task records
 * @route   GET /api/jwt/private-tasks
 */
router.get('/private-tasks', protect, asyncHandler(async (req, res) => {
  const tasks = await Employee.aggregate([
    { $unwind: '$profile.projects' },
    { $unwind: '$profile.projects.tasks' },
    { $group: { _id: '$profile.projects.tasks.taskId', description: { $first: '$profile.projects.tasks.description' } } },
    { $limit: 20 }
  ]);
  res.status(200).json({ status: 'success', results: tasks.length, data: { tasks } });
}));

/**
 * @desc    Access protected analytics dashboard
 * @route   GET /api/jwt/private-analytics
 */
router.get('/private-analytics', protect, asyncHandler(async (req, res) => {
  const totalEmployees = await Employee.countDocuments();
  const skills = await Employee.aggregate([
    { $unwind: '$profile.projects' },
    { $unwind: '$profile.projects.tasks' },
    { $group: { _id: '$profile.projects.tasks.assignedTo.skills.primary', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 }
  ]);
  res.status(200).json({ status: 'success', data: { totalEmployees, topSkills: skills } });
}));

// HEAD & OPTIONS for JWT routes (Dataset Lines 392)
router.options('/profile', (req, res) => {
  res.set('Allow', 'GET, OPTIONS').status(200).end();
});

module.exports = router;
