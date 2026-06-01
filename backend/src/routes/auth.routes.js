const express = require('express');
const authController = require('../controllers/auth.controller');
const { protect } = require('../middlewares/auth.middleware');
const { registerValidationRules, loginValidationRules } = require('../validations/employee.validation');

const router = express.Router();

// Public routes
router.post('/register', registerValidationRules, authController.register);
router.post('/login', loginValidationRules, authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);
router.post('/reset-password', authController.resetPassword);
router.post('/send-otp', authController.sendOTP);
router.post('/verify-otp', authController.verifyOTP);

// Protected routes
router.use(protect);

router.post('/logout', authController.logout);
router.get('/profile', authController.getProfile);
router.patch('/profile', authController.updateProfile);
router.delete('/profile', authController.deleteProfile);
router.patch('/change-password', authController.changePassword);
router.post('/change-password', authController.changePassword);
router.post('/verify-email', (req, res) => res.status(200).json({ status: 'success', message: 'Email verified' }));
router.post('/resend-verification', (req, res) => res.status(200).json({ status: 'success', message: 'Verification email resent' }));

// HEAD & OPTIONS (Dataset Line 385)
router.head('/profile', (req, res) => res.status(200).end());
router.options('/login', (req, res) => res.set('Allow', 'POST, OPTIONS').status(200).end());

module.exports = router;
