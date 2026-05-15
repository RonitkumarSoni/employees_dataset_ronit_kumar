const express = require('express');
const literalController = require('../../controllers/literal.controller');
const router = express.Router();

// Request Validation Practice
router.get('/validate/body', literalController.genericLiteral('Body validation practice'));
router.get('/validate/params/:id', literalController.genericLiteral('Params validation practice'));
router.get('/validate/query', literalController.genericLiteral('Query validation practice'));
router.get('/validate/headers', literalController.genericLiteral('Headers validation practice'));
router.get('/validate/cookies', literalController.genericLiteral('Cookies validation practice'));
router.get('/validate/all', literalController.genericLiteral('All validation practice'));

// Rate Limiting Practice
router.get('/rate-limit/test', literalController.genericLiteral('Rate limit test practice'));
router.get('/rate-limit/reset', literalController.genericLiteral('Rate limit reset practice'));
router.get('/rate-limit/status', literalController.genericLiteral('Rate limit status practice'));

module.exports = router;
