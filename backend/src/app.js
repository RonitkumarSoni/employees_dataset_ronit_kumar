const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middlewares/error.middleware');

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
const searchRouter = require('./routes/search.routes');
const statsRouter = require('./routes/stats.routes');
const middlewareRouter = require('./routes/middleware.routes');
const systemRouter = require('./routes/system.routes');
const errorRouter = require('./routes/error.routes');
const literalSortRouter = require('./routes/literal/sort.routes');
const literalFilterRouter = require('./routes/literal/filter.routes');
const literalAnalyticsRouter = require('./routes/literal/analytics.routes');
const literalInfoRouter = require('./routes/literal/info.routes');

app.use('/api/auth', authRouter);
app.use('/api/employees', employeeRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/search', searchRouter);
app.use('/api/stats', statsRouter);
app.use('/api/middleware', middlewareRouter);
app.use('/api/system', systemRouter);
app.use('/api/error', errorRouter);
app.use('/api/employees/sort', literalSortRouter);
app.use('/api/employees/filter', literalFilterRouter);
app.use('/api/employees/analytics', literalAnalyticsRouter);
app.use('/api/employees', literalInfoRouter); // This will handle /exists/:id, /name/:name etc.

// JWT Aliases (Dataset compatibility)
app.use('/api/jwt', authRouter); 

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

// --- Global Error Handler ---
app.use(errorHandler);

module.exports = app;
