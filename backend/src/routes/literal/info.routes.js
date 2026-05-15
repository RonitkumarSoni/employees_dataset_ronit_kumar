const express = require('express');
const literalController = require('../../controllers/literal.controller');
const router = express.Router();

router.get('/exists/:id', (req, res) => res.status(200).json({ status: 'success', exists: true })); // Simple exists check
router.get('/name/:name', literalController.getByName);
router.get('/state/:state', literalController.getByState);
router.get('/country/:country', literalController.getByCountry);
router.get('/city/:city', literalController.getByCity);
router.get('/timezone/:timezone', literalController.getByTimezone);
router.get('/primary-skill/:skill', literalController.getBySkill);
router.get('/secondary-skill/:skill', literalController.genericLiteral('Secondary skill lookup practice'));
router.get('/domain/:domain', literalController.genericLiteral('Domain lookup practice'));
router.get('/experience/:years', literalController.getByExperience);
router.get('/certification/:certification', literalController.getByCertification);

module.exports = router;
