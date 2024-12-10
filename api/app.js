var express = require('express');
var app = express();
var uuid = require('node-uuid');

var pg = require('pg');
var conString = process.env.DB; // "postgres://username:password@localhost/database";

// Define API URL (ensure this points to your API container's URL)
const apiUrl = process.env.API_URL || 'http://172.235.1.190:8080'; // Adjust to match API container
// Routes

// Root route
app.get('/', function(req, res) {
  res.json({
    message: 'Welcome to the API!',
    available_routes: [
      '/api/status'
    ]
  });
});

// Status route
app.get('/api/status', function(req, res) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return res.status(500).send('error fetching client from pool');
    }
    client.query('SELECT now() as time', [], function(err, result) {
      // Release the client back to the pool
      done();

      if (err) {
        return res.status(500).send('error running query');
      }

      return res.json({
        request_uuid: uuid.v4(),
        time: result.rows[0].time
      });
    });
  });
});

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handlers

// Development error handler
// Will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// Production error handler
// No stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

module.exports = app;
