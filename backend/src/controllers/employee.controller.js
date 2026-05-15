const employeeService = require('../services/employee.service');

/**
 * @desc    Create new employee
 * @route   POST /api/employees
 * @access  Private/Admin
 */
exports.createEmployee = async (req, res) => {
  try {
    const employee = await employeeService.createEmployee(req.body);
    res.status(201).json({
      status: 'success',
      data: { employee },
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'error',
      message: error.message,
    });
  }
};

/**
 * @desc    Get all employees
 * @route   GET /api/employees
 * @access  Private
 */
exports.getEmployees = async (req, res) => {
  try {
    const employees = await employeeService.getAllEmployees(req.query);
    res.status(200).json({
      status: 'success',
      results: employees.length,
      data: { employees },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

/**
 * @desc    Get single employee
 * @route   GET /api/employees/:id
 * @access  Private
 */
exports.getEmployee = async (req, res) => {
  try {
    const employee = await employeeService.getEmployeeById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: { employee },
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'error',
      message: error.message,
    });
  }
};

/**
 * @desc    Update employee
 * @route   PATCH /api/employees/:id
 * @access  Private/Admin
 */
exports.updateEmployee = async (req, res) => {
  try {
    const employee = await employeeService.updateEmployee(req.params.id, req.body);
    res.status(200).json({
      status: 'success',
      data: { employee },
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'error',
      message: error.message,
    });
  }
};

/**
 * @desc    Delete employee
 * @route   DELETE /api/employees/:id
 * @access  Private/Admin
 */
exports.deleteEmployee = async (req, res) => {
  try {
    await employeeService.deleteEmployee(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'error',
      message: error.message,
    });
  }
};
