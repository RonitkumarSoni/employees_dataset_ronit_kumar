const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// --- Global Middlewares ---

// Secure HTTP headers with Helmet
app.use(helmet());

// Logging middleware for development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting to prevent Brute Force/DoS attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use('/api', limiter);

// Enable CORS
app.use(cors());

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// --- Routes ---
const authRouter = require('./routes/auth.routes');
const employeeRouter = require('./routes/employee.routes');
const analyticsRouter = require('./routes/analytics.routes');

app.use('/api/auth', authRouter);
app.use('/api/employees', employeeRouter);
app.use('/api/analytics', analyticsRouter);

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to the Employee Management Analytics API',
  });
});

// --- 404 Handler ---
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

module.exports = app;
