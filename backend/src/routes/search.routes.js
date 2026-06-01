const express = require('express');
const searchController = require('../controllers/search.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(protect);

// Search
router.options('/employees', (req, res) => res.set('Allow', 'GET, OPTIONS').status(200).end());
router.get('/employees', searchController.searchEmployees);

// Filters
router.get('/filter/high-experience', searchController.filterHighExperience);
router.get('/filter/low-experience', searchController.filterLowExperience);
router.get('/filter/verified', searchController.filterVerified);
router.get('/filter/recent-certifications', searchController.filterRecentCertifications);
router.get('/filter/:domain', searchController.filterByDomainKeyword);
router.get('/filter/skill/:skill', searchController.filterBySkillKeyword);

module.exports = router;
