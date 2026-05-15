const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

/**
 * Generates a JWT token for a user
 * @param {String} id - User ID
 * @returns {String} JWT Token
 */
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

class AuthService {
  /**
   * Register a new user
   * @param {Object} userData 
   * @returns {Object} User and Token
   */
  async registerUser(userData) {
    const { name, email, password, role } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error('User with this email already exists');
      error.statusCode = 400;
      throw error;
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      role
    });

    // Remove password from output
    user.password = undefined;

    const token = signToken(user._id);

    return { user, token };
  }

  /**
   * Login user
   * @param {String} email 
   * @param {String} password 
   * @returns {Object} User and Token
   */
  async loginUser(email, password) {
    if (!email || !password) {
      const error = new Error('Please provide email and password');
      error.statusCode = 400;
      throw error;
    }

    // Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !(await user.correctPassword(password, user.password))) {
      const error = new Error('Incorrect email or password');
      error.statusCode = 401;
      throw error;
    }

    // Remove password from output
    user.password = undefined;

    const token = signToken(user._id);

    return { user, token };
  }

  /**
   * Get user profile by ID
   * @param {String} userId 
   * @returns {Object} User
   */
  async getUserProfile(userId) {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    return user;
  }
}

module.exports = new AuthService();
