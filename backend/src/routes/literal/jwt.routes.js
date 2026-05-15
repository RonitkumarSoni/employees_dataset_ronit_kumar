const express = require('express');
const literalController = require('../../controllers/literal.controller');
const router = express.Router();

router.get('/token', literalController.jwtCheck);
router.get('/verify', literalController.jwtCheck);
router.get('/refresh', literalController.jwtStatus('refresh'));
router.get('/decode', literalController.jwtDecode);
router.get('/check-expiry', literalController.jwtStatus('expiry'));
router.get('/blacklist', literalController.jwtStatus('blacklist'));
router.get('/revoke', literalController.jwtStatus('revoke'));
router.get('/roles', literalController.jwtStatus('roles'));
router.get('/permissions', literalController.jwtStatus('permissions'));
router.get('/validate', literalController.jwtCheck);

module.exports = router;
