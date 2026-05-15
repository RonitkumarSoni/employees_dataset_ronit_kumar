/**
 * Employee data validation rules
 * Validates request body before processing
 */

const validateEmployee = (req, res, next) => {
  const { name, employeeId } = req.body;
  const errors = [];

  if (!name || name.trim().length < 2) {
    errors.push('Name is required and must be at least 2 characters');
  }

  if (!employeeId || employeeId.trim().length === 0) {
    errors.push('Employee ID is required');
  }

  if (req.body.salary && (isNaN(req.body.salary) || req.body.salary < 0)) {
    errors.push('Salary must be a valid positive number');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      status: 'fail',
      errors,
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    errors.push('Please provide a valid email address');
  }

  if (!password || password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      status: 'fail',
      errors,
    });
  }

  next();
};

module.exports = { validateEmployee, validateLogin };
