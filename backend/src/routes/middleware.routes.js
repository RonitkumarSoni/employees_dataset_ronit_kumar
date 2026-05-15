const express = require('express');
const practiceController = require('../controllers/practice.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(protect);

router.get('/logger', practiceController.loggerPractice);
router.get('/auth', practiceController.authPractice);
router.get('/rate-limit', practiceController.rateLimitPractice);
router.get('/error-handler', practiceController.errorHandlerPractice);
router.get('/request-time', practiceController.requestTimePractice);
router.get('/role-check', practiceController.roleCheckPractice);
router.get('/validation', practiceController.validationPractice);
router.get('/audit-log', practiceController.auditLogPractice);

module.exports = router;
