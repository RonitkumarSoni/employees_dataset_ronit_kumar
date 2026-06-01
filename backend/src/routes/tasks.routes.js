const express = require('express');
const { taskValidationRules } = require('../validations/employee.validation');

const router = express.Router();

router.post('/', taskValidationRules, (req, res) => {
  res.status(201).json({ status: 'success', message: 'Task payload validated', data: req.body });
});

module.exports = router;
