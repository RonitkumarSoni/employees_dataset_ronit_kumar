const express = require('express');
const { protect, restrictTo } = require('../middlewares/auth.middleware');
const asyncHandler = require('../utils/asyncHandler');
const Employee = require('../models/employee.model');

const router = express.Router();

// All admin routes require authentication + admin role
router.use(protect);
router.use(restrictTo('admin'));

/**
 * @desc    Admin protected route for managing employees
 * @route   GET /api/admin/employees
 */
router.get('/employees', asyncHandler(async (req, res) => {
  const employees = await Employee.find().limit(50);
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
}));

/**
 * @desc    Admin protected route for managing projects
 * @route   GET /api/admin/projects
 */
router.get('/projects', asyncHandler(async (req, res) => {
  const projects = await Employee.aggregate([
    { $unwind: '$profile.projects' },
    { $group: { _id: '$profile.projects.projectId', name: { $first: '$profile.projects.name' } } },
    { $sort: { name: 1 } }
  ]);
  res.status(200).json({ status: 'success', results: projects.length, data: { projects } });
}));

/**
 * @desc    Admin protected route for managing tasks
 * @route   GET /api/admin/tasks
 */
router.get('/tasks', asyncHandler(async (req, res) => {
  const tasks = await Employee.aggregate([
    { $unwind: '$profile.projects' },
    { $unwind: '$profile.projects.tasks' },
    { $group: { _id: '$profile.projects.tasks.taskId', description: { $first: '$profile.projects.tasks.description' } } },
    { $sort: { _id: 1 } },
    { $limit: 50 }
  ]);
  res.status(200).json({ status: 'success', results: tasks.length, data: { tasks } });
}));

/**
 * @desc    Admin protected route for managing certifications
 * @route   GET /api/admin/certifications
 */
router.get('/certifications', asyncHandler(async (req, res) => {
  const certifications = await Employee.aggregate([
    { $unwind: '$profile.projects' },
    { $unwind: '$profile.projects.tasks' },
    { $unwind: '$profile.projects.tasks.assignedTo.skills.experience.certifications.current' },
    { $group: { _id: '$profile.projects.tasks.assignedTo.skills.experience.certifications.current', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
  res.status(200).json({ status: 'success', results: certifications.length, data: { certifications } });
}));

/**
 * @desc    Admin dashboard with strict rate limiting
 * @route   GET /api/admin/dashboard
 */
router.get('/dashboard', asyncHandler(async (req, res) => {
  const totalEmployees = await Employee.countDocuments();
  res.status(200).json({ status: 'success', data: { totalEmployees, uptime: process.uptime(), environment: process.env.NODE_ENV } });
}));

// HEAD & OPTIONS for admin routes
router.options('/employees', (req, res) => {
  res.set('Allow', 'GET, OPTIONS').status(200).end();
});

module.exports = router;
