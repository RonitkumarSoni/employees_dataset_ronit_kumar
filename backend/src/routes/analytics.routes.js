const express = require('express');
const analyticsController = require('../controllers/analytics.controller');
const { protect, restrictTo } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(protect);
router.use(restrictTo('admin'));

// General Stats
router.get('/stats', analyticsController.getStats);

// Distribution Analytics
router.get('/employees/skill-distribution', analyticsController.getSkillDistribution);
router.get('/employees/top-skills', analyticsController.getSkillDistribution);
router.get('/employees/domain-distribution', analyticsController.getDomainDistribution);
router.get('/employees/top-domains', analyticsController.getDomainDistribution);

// Certification & Technology
router.get('/employees/top-certifications', analyticsController.getCertificationAnalytics);
router.get('/employees/top-technologies', analyticsController.getTechnologyAnalytics);
router.get('/employees/top-projects', analyticsController.getProjectAnalytics);

// Location Analytics
router.get('/employees/country-analysis', analyticsController.getCountryAnalysis);
router.get('/employees/state-analysis', analyticsController.getStateAnalysis);
router.get('/employees/timezone-analysis', analyticsController.getTimezoneAnalysis);
router.get('/employees/location-analysis', analyticsController.getLocationAnalysis);

// Experience & Verification
router.get('/employees/experience-analysis', analyticsController.getExperienceAnalysis);
router.get('/employees/verification-analysis', analyticsController.getVerificationAnalysis);

// Project & Task Analytics
router.get('/employees/project-analysis', analyticsController.getProjectAnalytics);
router.get('/employees/task-analysis', analyticsController.getTaskAnalysis);

module.exports = router;
