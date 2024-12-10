const express = require('express');
const pg = require('pg'); // PostgreSQL client
const uuid = require('node-uuid');

const app = express();

// Database connection string from environment variables
const conString =
  process.env.API_DB || 'postgres://user1:password1@172.235.1.190:5432/busbud_db';

// API URL for external communication
const apiUrl = process.env.API_URL || 'http://172.235.1.190:4000';

// Create a PostgreSQL client
const client = new pg.Client(conString);

// Connect to the database
client.connect((err) => {
  if (err) {
    console.error('Could not connect to the database:', err.message);
  } else {
    console.log('Connected to the PostgreSQL database successfully.');
  }
});

// Routes

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the API!',
    available_routes: ['/api/status'],
  });
});

// Status route
app.get('/api/status', async (req, res) => {
  try {
    // Example query to check database status
    const result = await client.query('SELECT NOW() as current_time');
    res.json({
      status: 'API is running',
      database_time: result.rows[0].current_time,
    });
  } catch (error) {
    console.error('Error fetching database status:', error.message);
    res.status(500).json({
      status: 'API is running, but database query failed',
      error: error.message,
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unexpected error:', err.message);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message,
  });
});

// Start the server
const PORT = process.env.API_PORT || 4000;
app.listen(PORT, () => {
  console.log(`API is running on ${apiUrl} and listening on port ${PORT}`);
});

module.exports = app;
