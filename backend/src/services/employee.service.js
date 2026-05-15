const Employee = require('../models/employee.model');

class EmployeeService {
  /**
   * Create a new employee
   * @param {Object} employeeData 
   * @returns {Object} New Employee
   */
  async createEmployee(employeeData) {
    const employee = await Employee.create(employeeData);
    return employee;
  }

  /**
   * Get all employees with basic filtering and pagination
   * @param {Object} query - Express query object
   * @returns {Array} Employees
   */
  async getAllEmployees(query = {}) {
    // Basic implementation - Search/Filter/Sort will be enhanced in next phase
    const employees = await Employee.find();
    return employees;
  }

  /**
   * Get employee by ID
   * @param {String} id 
   * @returns {Object} Employee
   */
  async getEmployeeById(id) {
    const employee = await Employee.findById(id);
    if (!employee) {
      const error = new Error('Employee not found');
      error.statusCode = 404;
      throw error;
    }
    return employee;
  }

  /**
   * Update employee
   * @param {String} id 
   * @param {Object} updateData 
   * @returns {Object} Updated Employee
   */
  async updateEmployee(id, updateData) {
    const employee = await Employee.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    
    if (!employee) {
      const error = new Error('Employee not found');
      error.statusCode = 404;
      throw error;
    }
    return employee;
  }

  /**
   * Delete employee
   * @param {String} id 
   */
  async deleteEmployee(id) {
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      const error = new Error('Employee not found');
      error.statusCode = 404;
      throw error;
    }
    return employee;
  }
}

module.exports = new EmployeeService();
