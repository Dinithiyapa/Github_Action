import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import fetch from 'node-fetch'; // Use import for node-fetch (ESM)

import routes from './routes/index';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Define API URL (ensure this points to your API container's URL)
const apiUrl = process.env.API_URL || 'http://172.235.1.190:8080'; // Adjust to match API container

// Fetch status from the API
app.get('/status', (req, res) => {
  fetch(`${apiUrl}/api/status`) // API call to the API container
    .then(response => response.json())
    .then(data => {
      res.render('status', { data: data }); // Render status in the view
    })
    .catch(error => {
      console.error('Error fetching API:', error);
      res.status(500).json({ message: 'Error connecting to API' });
    });
});

app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

export default app;
