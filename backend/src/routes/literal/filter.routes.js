const express = require('express');
const literalController = require('../../controllers/literal.controller');
const router = express.Router();

router.get('/high-experience', literalController.filterHighExperience);
router.get('/low-experience', literalController.filterLowExperience);
router.get('/verified-certification', literalController.filterVerified);
router.get('/domain-keyword', literalController.filterByDomain);
router.get('/skill-set', literalController.genericLiteral('Skill set filter practice'));
router.get('/state-wise', literalController.genericLiteral('State wise filter practice'));
router.get('/country-wise', literalController.genericLiteral('Country wise filter practice'));
router.get('/city-wise', literalController.genericLiteral('City wise filter practice'));
router.get('/timezone-wise', literalController.genericLiteral('Timezone wise filter practice'));
router.get('/salary-range', literalController.genericLiteral('Salary range filter practice'));

module.exports = router;
