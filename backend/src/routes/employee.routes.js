const express = require('express');
const employeeController = require('../controllers/employee.controller');
const { protect, restrictTo } = require('../middlewares/auth.middleware');
const { employeeValidationRules } = require('../validations/employee.validation');

const router = express.Router();

// Protect all routes
router.use(protect);

// Employee Information Routes (must be before /:id)
router.get('/verified', employeeController.getVerified);
router.get('/projects', employeeController.getProjects);
router.get('/tasks', employeeController.getTasks);
router.get('/top-experience', employeeController.getTopExperience);
router.get('/top-skills', employeeController.getTopSkills);
router.get('/cloud-engineers', employeeController.getCloudEngineers);
router.get('/devops-engineers', employeeController.getDevopsEngineers);
router.get('/ai-engineers', employeeController.getAiEngineers);
router.get('/fullstack', employeeController.getFullstack);
router.get('/recent-certifications', employeeController.getRecentCertifications);

// Lookup by specific fields
router.get('/name/:name', employeeController.getByName);
router.get('/state/:state', employeeController.getByState);
router.get('/country/:country', employeeController.getByCountry);
router.get('/city/:city', employeeController.getByCity);
router.get('/timezone/:timezone', employeeController.getByTimezone);
router.get('/primary-skill/:skill', employeeController.getByPrimarySkill);
router.get('/secondary-skill/:skill', employeeController.getBySecondarySkill);
router.get('/domain/:domain', employeeController.getByDomain);
router.get('/experience/:years', employeeController.getByExperience);
router.get('/certification/:certification', employeeController.getByCertification);
router.get('/exists/:id', employeeController.checkExists);

// Bulk Operations (Admin only)
router.post('/bulk-create', restrictTo('admin'), employeeController.bulkCreate);
router.patch('/bulk-update', restrictTo('admin'), employeeController.bulkUpdate);
router.delete('/bulk-delete', restrictTo('admin'), employeeController.bulkDelete);

// Basic CRUD
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
