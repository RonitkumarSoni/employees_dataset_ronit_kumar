const express = require('express');
const employeeController = require('../controllers/employee.controller');
const { protect, restrictTo } = require('../middlewares/auth.middleware');

const router = express.Router();

// Protect all routes
router.use(protect);

router
  .route('/')
  .get(employeeController.getEmployees)
  .post(restrictTo('admin'), employeeController.createEmployee);

router
  .route('/:id')
  .get(employeeController.getEmployee)
  .patch(restrictTo('admin'), employeeController.updateEmployee)
  .delete(restrictTo('admin'), employeeController.deleteEmployee);

module.exports = router;
