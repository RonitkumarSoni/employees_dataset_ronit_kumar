const express = require('express');
const literalController = require('../../controllers/literal.controller');
const router = express.Router();

router.get('/skill-distribution', literalController.getSkillDistribution);
router.get('/country-distribution', literalController.getCountryDistribution);
router.get('/state-distribution', literalController.genericLiteral('State distribution analytics practice'));
router.get('/domain-distribution', literalController.genericLiteral('Domain distribution analytics practice'));
router.get('/certification-analytics', literalController.genericLiteral('Certification analytics practice'));
router.get('/project-analytics', literalController.genericLiteral('Project analytics practice'));
router.get('/technology-analytics', literalController.genericLiteral('Technology analytics practice'));
router.get('/timezone-analytics', literalController.genericLiteral('Timezone analytics practice'));
router.get('/location-analytics', literalController.genericLiteral('Location analytics practice'));
router.get('/experience-analytics', literalController.genericLiteral('Experience analytics practice'));
router.get('/verification-analytics', literalController.genericLiteral('Verification analytics practice'));
router.get('/task-analytics', literalController.genericLiteral('Task analytics practice'));

module.exports = router;
