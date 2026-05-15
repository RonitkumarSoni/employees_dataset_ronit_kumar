const express = require('express');
const router = express.Router();

router.get('/400', (req, res) => {
  res.status(400).json({ status: 'fail', message: 'Bad Request practice' });
});

router.get('/401', (req, res) => {
  res.status(401).json({ status: 'fail', message: 'Unauthorized practice' });
});

router.get('/403', (req, res) => {
  res.status(403).json({ status: 'fail', message: 'Forbidden practice' });
});

router.get('/404', (req, res) => {
  res.status(404).json({ status: 'fail', message: 'Not Found practice' });
});

router.get('/500', (req, res) => {
  res.status(500).json({ status: 'error', message: 'Internal Server Error practice' });
});

module.exports = router;
