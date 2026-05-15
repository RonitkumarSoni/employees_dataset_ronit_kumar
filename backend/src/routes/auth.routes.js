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
router.post('/send-otp', authController.sendOTP);
router.post('/verify-otp', authController.verifyOTP);

// Protected routes
router.use(protect);

router.post('/logout', authController.logout);
router.get('/profile', authController.getProfile);
router.patch('/profile', authController.updateProfile);
router.patch('/change-password', authController.changePassword);
router.post('/verify-email', (req, res) => res.status(200).json({ status: 'success', message: 'Email verified' }));

module.exports = router;
