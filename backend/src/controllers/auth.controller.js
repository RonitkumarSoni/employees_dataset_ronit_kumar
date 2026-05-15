const authService = require('../services/auth.service');
const asyncHandler = require('../utils/asyncHandler');

exports.register = asyncHandler(async (req, res) => {
  const { user, token } = await authService.registerUser(req.body);
  res.status(201).json({ status: 'success', token, data: { user } });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await authService.loginUser(email, password);
  res.status(200).json({ status: 'success', token, data: { user } });
});

exports.getProfile = asyncHandler(async (req, res) => {
  const user = await authService.getUserProfile(req.user.id);
  res.status(200).json({ status: 'success', data: { user } });
});

exports.updateProfile = asyncHandler(async (req, res) => {
  const user = await authService.updateProfile(req.user.id, req.body);
  res.status(200).json({ status: 'success', data: { user } });
});

exports.changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const { user, token } = await authService.changePassword(req.user.id, currentPassword, newPassword);
  res.status(200).json({ status: 'success', token, data: { user } });
});

exports.forgotPassword = asyncHandler(async (req, res) => {
  const resetToken = await authService.forgotPassword(req.body.email);
  res.status(200).json({ status: 'success', message: 'Token sent to email (returning here for test)', resetToken });
});

exports.resetPassword = asyncHandler(async (req, res) => {
  const { user, token } = await authService.resetPassword(req.params.token, req.body.password);
  res.status(200).json({ status: 'success', token, data: { user } });
});

exports.sendOTP = asyncHandler(async (req, res) => {
  const otp = await authService.sendOTP(req.body.email);
  res.status(200).json({ status: 'success', message: 'OTP sent to email', otp });
});

exports.verifyOTP = asyncHandler(async (req, res) => {
  const user = await authService.verifyOTP(req.body.email, req.body.otp);
  res.status(200).json({ status: 'success', message: 'OTP verified successfully', data: { user } });
});

exports.logout = asyncHandler(async (req, res) => {
  res.status(200).json({ status: 'success', message: 'Logged out successfully' });
});
