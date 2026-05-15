const express = require('express');
const statsController = require('../controllers/stats.controller');
const { protect, restrictTo } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(protect);
router.use(restrictTo('admin'));

router.get('/employees/count', statsController.getEmployeeCount);
router.get('/employees/experience-average', statsController.getAverageExperience);
router.get('/employees/top-experience', statsController.getTopExperience);
router.get('/employees/project-count', statsController.getProjectCount);
router.get('/employees/task-count', statsController.getTaskCount);
router.get('/employees/country-count', statsController.getCountryCount);
router.get('/employees/state-count', statsController.getStateCount);
router.get('/employees/domain-count', statsController.getDomainCount);
router.get('/employees/skill-count', statsController.getSkillCount);
router.get('/employees/certification-count', statsController.getCertificationCount);
router.get('/employees/timezone-count', statsController.getTimezoneCount);
router.get('/employees/verified-count', statsController.getVerifiedCount);
router.get('/employees/project-distribution', statsController.getProjectDistribution);
router.get('/employees/task-distribution', statsController.getTaskDistribution);
router.get('/employees/technology-count', statsController.getTechnologyCount);

module.exports = router;
