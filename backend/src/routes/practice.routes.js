const express = require('express');
const practiceController = require('../controllers/practice.controller');
const { protect, restrictTo } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(protect);

// Middleware Practice
router.get('/logger', practiceController.loggerPractice);
router.get('/auth', practiceController.authPractice);
router.get('/rate-limit', practiceController.rateLimitPractice);
router.get('/error-handler', practiceController.errorHandlerPractice);
router.get('/request-time', practiceController.requestTimePractice);
router.get('/role-check', practiceController.roleCheckPractice);
router.get('/validation', practiceController.validationPractice);
router.get('/audit-log', practiceController.auditLogPractice);

// Advanced Practice
router.get('/random', practiceController.getRandomEmployee);
router.get('/trending-skills', practiceController.getTrendingSkills);
router.get('/recent', practiceController.getRecentEmployees);
router.get('/system/health', practiceController.getHealth);
router.get('/system/version', (req, res) => res.status(200).json({ status: 'success', version: '1.0.0' }));
router.get('/system/config', practiceController.getConfig);

module.exports = router;
