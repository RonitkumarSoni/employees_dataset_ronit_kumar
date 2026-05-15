const express = require('express');
const statsController = require('../controllers/stats.controller');
const { protect, restrictTo } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(protect);
router.use(restrictTo('admin'));

router.get('/count', statsController.getEmployeeCount);
router.get('/experience-average', statsController.getAverageExperience);
router.get('/top-experience', statsController.getTopExperience);
router.get('/project-count', statsController.getProjectCount);
router.get('/task-count', statsController.getTaskCount);
router.get('/country-count', statsController.getCountryCount);
router.get('/state-count', statsController.getStateCount);
router.get('/domain-count', statsController.getDomainCount);
router.get('/skill-count', statsController.getSkillCount);
router.get('/certification-count', statsController.getCertificationCount);
router.get('/timezone-count', statsController.getTimezoneCount);
router.get('/verified-count', statsController.getVerifiedCount);
router.get('/project-distribution', statsController.getProjectDistribution);
router.get('/task-distribution', statsController.getTaskDistribution);
router.get('/technology-count', statsController.getTechnologyCount);

module.exports = router;
