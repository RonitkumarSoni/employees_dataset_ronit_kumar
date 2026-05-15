const express = require('express');
const practiceController = require('../controllers/practice.controller');

const router = express.Router();

router.get('/health', practiceController.getHealth);
router.get('/version', (req, res) => res.status(200).json({ status: 'success', version: '1.0.0' }));
router.get('/config', practiceController.getConfig);

module.exports = router;
