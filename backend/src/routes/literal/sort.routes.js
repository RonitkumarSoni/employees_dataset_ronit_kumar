const express = require('express');
const literalController = require('../../controllers/literal.controller');
const router = express.Router();

router.get('/experience-asc', literalController.sortByExperienceAsc);
router.get('/experience-desc', literalController.sortByExperienceDesc);
router.get('/salary-asc', literalController.sortBySalaryAsc);
router.get('/salary-desc', literalController.sortBySalaryDesc);
router.get('/name-asc', literalController.sortByNameAsc);
router.get('/name-desc', literalController.sortByNameDesc);
router.get('/age-asc', literalController.genericLiteral('Age asc sort practice'));
router.get('/age-desc', literalController.genericLiteral('Age desc sort practice'));
router.get('/joining-date-asc', literalController.genericLiteral('Joining date asc sort practice'));
router.get('/joining-date-desc', literalController.genericLiteral('Joining date desc sort practice'));

module.exports = router;
