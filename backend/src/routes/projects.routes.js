const express = require('express');
const { projectValidationRules } = require('../validations/employee.validation');

const router = express.Router();

router.post('/', projectValidationRules, (req, res) => {
  res.status(201).json({ status: 'success', message: 'Project payload validated', data: req.body });
});

module.exports = router;
