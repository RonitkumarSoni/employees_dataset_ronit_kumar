const express = require('express');
const employeeController = require('../controllers/employee.controller');
const { protect, restrictTo } = require('../middlewares/auth.middleware');
const { employeeValidationRules } = require('../validations/employee.validation');
const asyncHandler = require('../utils/asyncHandler');
const Employee = require('../models/employee.model');

const router = express.Router();

// Protect all routes
router.use(protect);

// --- Employee Information Routes (must be before /:id) ---
router.get('/verified', employeeController.getVerified);
router.head('/projects', employeeController.getProjects);
router.get('/projects', employeeController.getProjects);
router.get('/tasks', employeeController.getTasks);
router.get('/top-experience', employeeController.getTopExperience);
router.get('/top-skills', employeeController.getTopSkills);
router.get('/cloud-engineers', employeeController.getCloudEngineers);
router.get('/devops-engineers', employeeController.getDevopsEngineers);
router.get('/ai-engineers', employeeController.getAiEngineers);
router.get('/fullstack', employeeController.getFullstack);
router.get('/recent-certifications', employeeController.getRecentCertifications);

// --- Advanced Practice Routes (Dataset Lines 344-372) ---
const practiceController = require('../controllers/practice.controller');
router.get('/random', practiceController.getRandomEmployee);
router.get('/trending-skills', practiceController.getTrendingSkills);
router.get('/recent', practiceController.getRecentEmployees);
router.get('/recommendations', practiceController.genericPractice('Employee recommendations based on skills'));
router.get('/logs', practiceController.genericPractice('API system logs'));
router.post('/report', practiceController.genericPractice('Employee data issue report submitted'));
router.post('/cache/clear', practiceController.genericPractice('Cached employee records cleared'));
router.post('/import-json', practiceController.genericPractice('JSON import handler'));

// --- Predictions (Dataset Lines 351-352) ---
router.get('/predictions/performance', practiceController.genericPractice('Employee performance trend prediction'));
router.get('/predictions/project-fit', practiceController.genericPractice('Employee project compatibility prediction'));

// --- Segments (Dataset Lines 353-357) ---
router.get('/segments/top-performers', practiceController.genericPractice('Top performer employee segments'));
router.get('/segments/cloud-engineers', practiceController.genericPractice('Cloud engineer segments'));
router.get('/segments/devops', practiceController.genericPractice('DevOps engineer segments'));
router.get('/segments/ai-engineers', practiceController.genericPractice('AI engineer segments'));
router.get('/segments/fullstack', practiceController.genericPractice('Full stack engineer segments'));

// --- Heatmaps (Dataset Lines 358-360) ---
router.get('/heatmap/countries', practiceController.genericPractice('Country wise employee heatmap'));
router.get('/heatmap/states', practiceController.genericPractice('State wise employee heatmap'));
router.get('/heatmap/skills', practiceController.genericPractice('Skill distribution heatmap'));

// --- Insights (Dataset Lines 361-363) ---
router.get('/insights/projects', practiceController.genericPractice('Project insights'));
router.get('/insights/tasks', practiceController.genericPractice('Task insights'));
router.get('/insights/certifications', practiceController.genericPractice('Certification insights'));

// --- Alerts (Dataset Lines 364-366) ---
router.get('/alerts/expired-certifications', practiceController.genericPractice('Expired certification alerts'));
router.get('/alerts/high-workload', practiceController.genericPractice('Employee workload alerts'));
router.get('/alerts/project-delays', practiceController.genericPractice('Project delay alerts'));

// --- System (Dataset Lines 368-372) ---
router.get('/system/health', practiceController.genericPractice('API health status'));
router.get('/system/version', practiceController.genericPractice('API version details'));
router.get('/system/config', practiceController.genericPractice('Public configuration details'));
router.get('/system/logs', practiceController.genericPractice('System log monitoring'));

// --- Live Search & Dashboard (Dataset Lines 339-341) ---
router.get('/live-search', practiceController.genericPractice('Live search results'));
router.get('/heatmap', practiceController.genericPractice('Employee heatmap visualization'));
router.get('/dashboard', practiceController.genericPractice('Employee dashboard'));
router.get('/high-experience', practiceController.genericPractice('High experience employees analytics'));

// --- Sorting Literal (Dataset Lines 108-112) ---
router.get('/sort/experience-desc', practiceController.genericPractice('Sort by highest experience first'));
router.get('/sort/experience-asc', practiceController.genericPractice('Sort by lowest experience first'));
router.get('/sort/name-asc', practiceController.genericPractice('Sort employees alphabetically ascending'));
router.get('/sort/name-desc', practiceController.genericPractice('Sort employees alphabetically descending'));
router.get('/sort/project-asc', practiceController.genericPractice('Sort projects alphabetically'));
router.get('/sort/domain-asc', practiceController.genericPractice('Sort domains alphabetically'));
router.get('/sort/certification-desc', practiceController.genericPractice('Sort certification records'));

// --- Filtering Literal (Dataset Lines 133-150) ---
router.get('/filter/high-experience', asyncHandler(async (req, res) => {
  const employees = await Employee.find({ 'profile.projects.tasks.assignedTo.skills.experience.years': { $gte: 8 } });
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
}));
router.get('/filter/low-experience', asyncHandler(async (req, res) => {
  const employees = await Employee.find({ 'profile.projects.tasks.assignedTo.skills.experience.years': { $lte: 3 } });
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
}));
router.get('/filter/verified', asyncHandler(async (req, res) => {
  const employees = await Employee.find({ 'profile.projects.tasks.assignedTo.skills.experience.certifications.meta.verified': true });
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
}));
router.get('/filter/cloud', asyncHandler(async (req, res) => {
  const employees = await Employee.find({ 'profile.projects.tasks.assignedTo.skills.experience.domains': { $regex: 'cloud', $options: 'i' } });
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
}));
router.get('/filter/finance', asyncHandler(async (req, res) => {
  const employees = await Employee.find({ 'profile.projects.tasks.assignedTo.skills.experience.domains': { $regex: 'finance', $options: 'i' } });
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
}));
router.get('/filter/healthcare', asyncHandler(async (req, res) => {
  const employees = await Employee.find({ 'profile.projects.tasks.assignedTo.skills.experience.domains': { $regex: 'healthcare', $options: 'i' } });
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
}));
router.get('/filter/devops', asyncHandler(async (req, res) => {
  const employees = await Employee.find({ 'profile.projects.tasks.assignedTo.skills.experience.domains': { $regex: 'devops', $options: 'i' } });
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
}));
router.get('/filter/ai', asyncHandler(async (req, res) => {
  const employees = await Employee.find({ 'profile.projects.tasks.assignedTo.skills.experience.domains': { $regex: 'ai', $options: 'i' } });
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
}));
router.get('/filter/fullstack', asyncHandler(async (req, res) => {
  const employees = await Employee.find({ 'profile.projects.tasks.assignedTo.skills.primary': { $regex: 'full', $options: 'i' } });
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
}));
router.get('/filter/kubernetes', asyncHandler(async (req, res) => {
  const employees = await Employee.find({ 'profile.projects.tasks.assignedTo.skills.secondary': { $regex: 'kubernetes', $options: 'i' } });
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
}));
router.get('/filter/react', asyncHandler(async (req, res) => {
  const employees = await Employee.find({ 'profile.projects.tasks.assignedTo.skills.secondary': { $regex: 'react', $options: 'i' } });
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
}));
router.get('/filter/nodejs', asyncHandler(async (req, res) => {
  const employees = await Employee.find({ 'profile.projects.tasks.assignedTo.skills.secondary': { $regex: 'node', $options: 'i' } });
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
}));
router.get('/filter/java', asyncHandler(async (req, res) => {
  const employees = await Employee.find({ 'profile.projects.tasks.assignedTo.skills.primary': { $regex: 'java', $options: 'i' } });
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
}));
router.get('/filter/python', asyncHandler(async (req, res) => {
  const employees = await Employee.find({ 'profile.projects.tasks.assignedTo.skills.primary': { $regex: 'python', $options: 'i' } });
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
}));
router.get('/filter/recent-certifications', asyncHandler(async (req, res) => {
  const employees = await Employee.aggregate([
    { $unwind: '$profile.projects' },
    { $unwind: '$profile.projects.tasks' },
    { $match: { 'profile.projects.tasks.assignedTo.skills.experience.certifications.meta.verified': true } },
    { $sort: { 'profile.projects.tasks.assignedTo.skills.experience.certifications.meta.lastUpdated': -1 } },
    { $limit: 20 },
    { $project: { name: 1, employeeId: 1, certifications: '$profile.projects.tasks.assignedTo.skills.experience.certifications' } },
  ]);
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
}));

// --- POST /employees/certifications & /employees/geo (Dataset Lines 320-321) ---
router.post('/certifications', practiceController.genericPractice('Certification metadata validated'));
router.post('/geo', practiceController.genericPractice('Geo coordinates validated'));

// --- Lookup by specific fields ---
router.get('/name/:name', employeeController.getByName);
router.get('/state/:state', employeeController.getByState);
router.get('/country/:country', employeeController.getByCountry);
router.get('/city/:city', employeeController.getByCity);
router.get('/timezone/:timezone(.+)', employeeController.getByTimezone);
router.get('/primary-skill/:skill', employeeController.getByPrimarySkill);
router.get('/secondary-skill/:skill', employeeController.getBySecondarySkill);
router.get('/domain/:domain', employeeController.getByDomain);
router.get('/experience/:years', employeeController.getByExperience);
router.get('/certification/:certification', employeeController.getByCertification);
router.get('/exists/:id', employeeController.checkExists);

// --- Missing Route Params (Dataset Lines 56-60) ---
router.get('/project/:projectId', asyncHandler(async (req, res) => {
  const employees = await Employee.find({ 'profile.projects.projectId': req.params.projectId });
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
}));
router.get('/task/:taskId', asyncHandler(async (req, res) => {
  const employees = await Employee.find({ 'profile.projects.tasks.taskId': req.params.taskId });
  res.status(200).json({ status: 'success', results: employees.length, data: { employees } });
}));
router.get('/performance/:id', asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (!employee) return res.status(404).json({ status: 'fail', message: 'Employee not found' });
  res.status(200).json({ status: 'success', data: { performance: { employeeId: employee.employeeId, name: employee.name, projects: employee.profile?.projects?.length || 0 } } });
}));
router.get('/stats/:id', asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (!employee) return res.status(404).json({ status: 'fail', message: 'Employee not found' });
  res.status(200).json({ status: 'success', data: { stats: { employeeId: employee.employeeId, name: employee.name, totalProjects: employee.profile?.projects?.length || 0 } } });
}));

// --- Bulk Operations (Admin only) ---
router.post('/bulk-create', restrictTo('admin'), employeeController.bulkCreate);
router.patch('/bulk-update', restrictTo('admin'), employeeController.bulkUpdate);
router.delete('/bulk-delete', restrictTo('admin'), employeeController.bulkDelete);

// --- HEAD & OPTIONS (Dataset Lines 380-393) ---
router.head('/', asyncHandler(async (req, res) => {
  const count = await Employee.countDocuments();
  res.set('X-Total-Count', count).status(200).end();
}));
router.options('/', (req, res) => {
  res.set('Allow', 'GET, POST, HEAD, OPTIONS').status(200).end();
});
router.head('/:id', asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  res.status(employee ? 200 : 404).end();
}));
router.options('/:id', (req, res) => {
  res.set('Allow', 'GET, PUT, PATCH, DELETE, HEAD, OPTIONS').status(200).end();
});

// --- Basic CRUD ---
router
  .route('/')
  .get(employeeController.getEmployees)
  .post(restrictTo('admin'), employeeValidationRules, employeeController.createEmployee);

router
  .route('/:id')
  .get(employeeController.getEmployee)
  .put(restrictTo('admin'), employeeValidationRules, employeeController.replaceEmployee)
  .patch(restrictTo('admin'), employeeController.updateEmployee)
  .delete(restrictTo('admin'), employeeController.deleteEmployee);

module.exports = router;
