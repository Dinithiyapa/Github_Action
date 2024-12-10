const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// Dynamically set API URL from environment variables, fallback to default
const apiUrl = process.env.API_URL || 'http://172.235.1.190:4000';

const routes = require('./routes/index');

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); // Or use Pug if upgraded

// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Route setup
app.use('/', routes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handlers
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack, // Include stack trace for debugging
    });
  });
}

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    error: {}, // Hide stack trace in production
  });
});

// Export the API URL for use in other modules if necessary
app.locals.apiUrl = apiUrl;

module.exports = app;
