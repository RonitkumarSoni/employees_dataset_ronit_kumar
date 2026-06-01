const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

/**
 * Generates a JWT token for a user
 * @param {String} id - User ID
 * @returns {String} JWT Token
 */
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '30d',
  });
};

class AuthService {
  async registerUser(userData) {
    const { name, email, password, role } = userData;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error('User with this email already exists');
      error.statusCode = 400;
      throw error;
    }
    const user = await User.create({ name, email, password, role });
    user.password = undefined;
    const token = signToken(user._id);
    return { user, token };
  }

  async loginUser(email, password) {
    if (!email || !password) {
      const error = new Error('Please provide email and password');
      error.statusCode = 400;
      throw error;
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) {
      const error = new Error('Incorrect email or password');
      error.statusCode = 401;
      throw error;
    }
    user.password = undefined;
    const token = signToken(user._id);
    return { user, token };
  }

  async getUserProfile(userId) {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    return user;
  }

  async updateProfile(userId, updateData) {
    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });
    return user;
  }

  async deleteProfile(userId) {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    return user;
  }

  async changePassword(userId, currentPassword, newPassword) {
    const user = await User.findById(userId).select('+password');
    if (!(await user.correctPassword(currentPassword, user.password))) {
      const error = new Error('Current password is incorrect');
      error.statusCode = 401;
      throw error;
    }
    user.password = newPassword;
    await user.save();
    const token = signToken(user._id);
    return { user, token };
  }

  async forgotPassword(email) {
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error('There is no user with that email address.');
      error.statusCode = 404;
      throw error;
    }
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
    // In a real app, send email here. Returning token for testing.
    return resetToken;
  }

  async resetPassword(token, password) {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) {
      const error = new Error('Token is invalid or has expired');
      error.statusCode = 400;
      throw error;
    }
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    const newToken = signToken(user._id);
    return { user, token: newToken };
  }

  async sendOTP(email) {
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000;
    await user.save({ validateBeforeSave: false });
    // In a real app, send OTP via email/SMS here.
    return otp;
  }

  async verifyOTP(email, otp) {
    const user = await User.findOne({
      email,
      otp,
      otpExpires: { $gt: Date.now() },
    });
    if (!user) {
      const error = new Error('OTP is invalid or has expired');
      error.statusCode = 400;
      throw error;
    }
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return user;
  }
}

module.exports = new AuthService();
