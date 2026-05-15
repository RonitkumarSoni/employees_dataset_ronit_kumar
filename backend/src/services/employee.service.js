const Employee = require('../models/employee.model');
const APIFeatures = require('../utils/apiFeatures');

class EmployeeService {
  async createEmployee(employeeData) {
    const employee = await Employee.create(employeeData);
    return employee;
  }

  async getAllEmployees(queryStr) {
    const features = new APIFeatures(Employee.find(), queryStr)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const employees = await features.query;
    const totalCount = await Employee.countDocuments();

    return { employees, totalCount };
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
