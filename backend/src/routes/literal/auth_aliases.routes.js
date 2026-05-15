const express = require('express');
const authController = require('../../controllers/auth.controller');
const literalController = require('../../controllers/literal.controller');
const router = express.Router();

// Using existing auth controller where possible, genericLiteral for others
router.get('/profile', authController.getProfile);
router.get('/get-profile', authController.getProfile);
router.patch('/update-profile', authController.updateProfile);
router.post('/logout', authController.logout);
router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password', (req, res) => res.status(200).json({ status: 'success', message: 'Use PATCH /reset-password/:token' }));
router.patch('/change-password', authController.changePassword);
router.post('/verify-email', literalController.genericLiteral('Email verification practice'));
router.post('/send-otp', literalController.genericLiteral('Send OTP practice'));
router.post('/verify-otp', literalController.genericLiteral('Verify OTP practice'));
router.post('/resend-verification', literalController.genericLiteral('Resend verification practice'));
router.delete('/delete-account', literalController.genericLiteral('Account deletion practice'));
router.post('/deactivate', literalController.genericLiteral('Account deactivation practice'));
router.post('/reactivate', literalController.genericLiteral('Account reactivation practice'));
router.get('/session', literalController.genericLiteral('Session check practice'));
router.get('/history', literalController.genericLiteral('Auth history practice'));
router.get('/logs', literalController.genericLiteral('Auth logs practice'));

module.exports = router;
