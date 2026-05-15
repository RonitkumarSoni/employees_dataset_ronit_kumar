const { body, validationResult } = require('express-validator');

/**
 * Enhanced validation using express-validator for robust checking
 */

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

  return res.status(400).json({
    status: 'fail',
    errors: extractedErrors,
  });
};

exports.employeeValidationRules = [
  body('name').notEmpty().withMessage('Name is required').isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('employeeId').notEmpty().withMessage('Employee ID is required'),
  body('profile.contact.email').isEmail().withMessage('Please provide a valid email address'),
  body('profile.contact.phone').optional().isMobilePhone().withMessage('Please provide a valid phone number'),
  body('salary').optional().isNumeric().withMessage('Salary must be a number'),
  body('profile.projects.*.tasks.*.assignedTo.skills.experience.years')
    .optional()
    .isNumeric()
    .withMessage('Experience years must be a number'),
  body('profile.contact.address.location.geo.timezone.name').optional().notEmpty().withMessage('Timezone format is required'),
  body('profile.projects.*.tasks.*.assignedTo.skills.primary').optional().notEmpty().withMessage('Primary skill is required'),
  body('profile.projects.*.tasks.*.assignedTo.skills.secondary').optional().isArray().withMessage('Secondary skills must be an array'),
  validate,
];

exports.loginValidationRules = [
  body('email').isEmail().withMessage('Please provide a valid email address'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  validate,
];

exports.registerValidationRules = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email address'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  validate,
];

exports.projectValidationRules = [
  body('name').notEmpty().withMessage('Project name is required'),
  body('projectId').notEmpty().withMessage('Project ID is required'),
  validate,
];

exports.taskValidationRules = [
  body('taskId').notEmpty().withMessage('Task ID is required'),
  body('description').notEmpty().withMessage('Task description is required'),
  validate,
];
