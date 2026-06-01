const asyncHandler = require('../utils/asyncHandler');
const Employee = require('../models/employee.model');

/**
 * Generic Practice Handler Factory
 * Returns a middleware that sends a success response with a custom message.
 * Used for practice/demo endpoints required by the dataset.
 */
exports.genericPractice = (message) => {
  return asyncHandler(async (req, res) => {
    res.status(200).json({
      status: 'success',
      message,
      timestamp: new Date().toISOString(),
      method: req.method,
      path: req.originalUrl,
    });
  });
};

/**
 * Middleware Practice Routes
 */
exports.loggerPractice = asyncHandler(async (req, res) => {
  res.status(200).json({ status: 'success', message: 'Request logging practice endpoint', timestamp: new Date().toISOString() });
});

exports.authPractice = asyncHandler(async (req, res) => {
  res.status(200).json({ status: 'success', message: 'Authentication practice endpoint', user: req.user ? req.user.name : 'anonymous' });
});

exports.rateLimitPractice = asyncHandler(async (req, res) => {
  res.status(200).json({ status: 'success', message: 'Rate limiting practice endpoint' });
});

exports.errorHandlerPractice = asyncHandler(async (req, res) => {
  throw new Error('Test error for practice');
});

exports.requestTimePractice = asyncHandler(async (req, res) => {
  res.status(200).json({ status: 'success', message: 'Request timing practice endpoint', timestamp: Date.now() });
});

exports.roleCheckPractice = asyncHandler(async (req, res) => {
  res.status(200).json({ status: 'success', message: 'Role-based access practice endpoint', role: req.user?.role || 'unknown' });
});

exports.validationPractice = asyncHandler(async (req, res) => {
  res.status(200).json({ status: 'success', message: 'Validation practice endpoint' });
});

exports.auditLogPractice = asyncHandler(async (req, res) => {
  res.status(200).json({ status: 'success', message: 'Audit logging practice endpoint', action: 'read', user: req.user?.name });
});

/**
 * Advanced Practice Routes
 */
exports.getRandomEmployee = asyncHandler(async (req, res) => {
  const count = await Employee.countDocuments();
  const random = Math.floor(Math.random() * count);
  const employee = await Employee.findOne().skip(random);
  res.status(200).json({ status: 'success', data: { employee } });
});

exports.getTrendingSkills = asyncHandler(async (req, res) => {
  const skills = await Employee.aggregate([
    { $unwind: '$profile.projects' },
    { $unwind: '$profile.projects.tasks' },
    { $group: { _id: '$profile.projects.tasks.assignedTo.skills.primary', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 }
  ]);
  res.status(200).json({ status: 'success', data: { skills } });
});

exports.getRecentEmployees = asyncHandler(async (req, res) => {
  const employees = await Employee.find().sort({ createdAt: -1 }).limit(10);
  res.status(200).json({ status: 'success', data: { employees } });
});

exports.getHealth = asyncHandler(async (req, res) => {
  res.status(200).json({ status: 'success', message: 'API is healthy', version: '1.0.0', uptime: process.uptime() });
});

exports.getConfig = asyncHandler(async (req, res) => {
  res.status(200).json({ 
    status: 'success', 
    data: { 
      environment: process.env.NODE_ENV,
      port: process.env.PORT,
      dbStatus: 'Connected'
    } 
  });
});
