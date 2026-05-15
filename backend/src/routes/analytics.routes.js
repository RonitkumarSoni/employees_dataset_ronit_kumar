const express = require('express');
const analyticsController = require('../controllers/analytics.controller');
const { protect, restrictTo } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(protect);
router.use(restrictTo('admin'));

router.get('/stats', analyticsController.getStats);
router.get('/skills', analyticsController.getSkillStats);
router.get('/countries', analyticsController.getCountryStats);
router.get('/domains', analyticsController.getDomainStats);

module.exports = router;
